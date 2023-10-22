// assets.service.ts
import { Injectable } from '@angular/core';
import { about } from 'src/data/about-us';
// import { features } from 'src/data/featuring-data';
import { faq } from 'src/data/faq';

// Firebase
import { Firestore, collectionData, collection, getDocs, orderBy, query } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AssetsService {

  featuringData: Observable<any[]> = of([]); // Initialize with an empty array

  constructor(private fs: Firestore) { }

  loadAssets(): Promise<HTMLImageElement[]> {
    const assetPaths = [
      'https://firebasestorage.googleapis.com/v0/b/healthmate-pup.appspot.com/o/big_phone_home.png?alt=media&token=63e9f519-197f-4fb5-bdfe-e8d15688d693',
      'https://firebasestorage.googleapis.com/v0/b/healthmate-pup.appspot.com/o/small_phone_home.png?alt=media&token=5f94ab25-fa84-4ee7-95d3-90ddbc3172df',
      'https://firebasestorage.googleapis.com/v0/b/healthmate-pup.appspot.com/o/phone_model.png?alt=media&token=8650313c-a7ae-43e9-8895-1a8d35b4ec2c',
      'https://firebasestorage.googleapis.com/v0/b/healthmate-pup.appspot.com/o/facebook.png?alt=media&token=89db7203-1b8a-4f1e-a77b-923517459317',
      'https://firebasestorage.googleapis.com/v0/b/healthmate-pup.appspot.com/o/github.png?alt=media&token=6bb28c83-cc54-4263-9b18-3aa0fb385b41',
      'https://firebasestorage.googleapis.com/v0/b/healthmate-pup.appspot.com/o/linkedin.png?alt=media&token=8e75d2bb-1210-43dc-b6d2-dd1e0eb32644',
      'https://firebasestorage.googleapis.com/v0/b/healthmate-pup.appspot.com/o/faq.png?alt=media&token=12acf9bf-5d23-41a0-ae4e-246266b9d0af'
    ];

    return Promise.all(
      assetPaths.map(path => this.loadImage(path)),
    );
  }

  // Features 
  loadFeaturesAssets(): Promise<{
    dataPaths: {
      id: number;
      name: string;
      description: string;
      asset: string;
    }[];
  }> {
    const colRef = collection(this.fs, 'featuring-data');

    return getDocs(colRef)
      .then((querySnapshot) => {
        const firestoreData = querySnapshot.docs.map((doc) => doc.data());
        return Promise.all(firestoreData.map((data) => this.loadImage(data['assetPath'])))
          .then(() => {
            const dataPaths = firestoreData.map((data) => ({
              id: data['id'],
              name: data['name'],
              description: data['description'],
              asset: data['assetPath'],
            }));
            return { dataPaths };
          })
          .catch((error) => {
            console.error('Error loading images: ', error);
            return { dataPaths: [] };
          });
      })
      .catch((error) => {
        console.error('Error getting documents: ', error);
        return { dataPaths: [] };
      });
  }

  // About us
  loadAboutUs(): Promise<{
    dataPaths: {
      id: number,
      name: string,
      position: string,
      description: string,
      fbLink: string,
      ghLink: string,
      liLink: string,
      asset: string
    }[]
  }> {
    const colRef = collection(this.fs, 'about');
    const orderedColRef = query(colRef, orderBy('id'));

    return getDocs(orderedColRef)
      .then((querySnapshot) => {
        const firestoreData = querySnapshot.docs.map((doc) => doc.data());
        return Promise.all(firestoreData.map((data) => this.loadImage(data['assetPath'])))
          .then(() => {
            const dataPaths = firestoreData.map((data) => ({
              id: data['id'],
              name: data['name'],
              position: data['position'],
              description: data['description'],
              fbLink: data['fblink'],
              ghLink: data['ghlink'],
              liLink: data['liilnk'],
              asset: data['assetPath'],
            }));
            return { dataPaths };
          })
          .catch((error) => {
            console.error('Error loading images: ', error);
            return { dataPaths: [] };
          });
      })
      .catch((error) => {
        console.error('Error getting documents: ', error);
        return { dataPaths: [] };
      });
  }

  loadFAQ(): Promise<{
    dataPaths: {
      id: number;
      question: string;
      answer: string;
      categoriesCode: string;
    }[];
  }> {
    const colRef = collection(this.fs, 'faq');
    const orderedColRef = query(colRef, orderBy('id'));

    return getDocs(orderedColRef)
      .then((querySnapshot) => {
        const firestoreData = querySnapshot.docs.map((doc) => doc.data())
        const dataPaths = firestoreData.map((data) => ({
          id: data['id'],
          question: data['question'],
          answer: data['answer'],
          categoriesCode: data['categoriesCode']
        }));

        console.log(dataPaths);
        return { dataPaths };
      })

      .catch((error) => {
        console.error('Error getting documents: ', error);
        return { dataPaths: [] };
      });
  }


  private loadImage(path: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = path;
      img.onload = () => resolve(img);
      img.onerror = () => reject(`Failed to load asset: ${path}`);
    });
  }

}
