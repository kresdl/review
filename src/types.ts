import firebase from 'firebase/app'

export type Stylable = {
  className?: string;
};

export type Extend<T extends HTMLElement> = React.HTMLProps<T> & React.HTMLAttributes<T>;

export type HasId = {
  id: string
}

export type Titled = {
  title: string
}

export type Album = Titled & {
  photos: Photo[]
}

export type SavedAlbum = HasId & Album

export type Role = 'user' | 'guest'

export type User = {
  uid: string
  email: string
  role: Role
}

export type Photo = {
  url: string
  name: string
}

export type Index = Record<string, SavedAlbum>

export type Tasks = Record<string, number | null>

export type Doc = firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData> | firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>