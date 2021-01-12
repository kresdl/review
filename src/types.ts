export type Stylable = {
  className?: string;
};

export type Extend<T extends HTMLElement> = React.HTMLProps<T> & React.HTMLAttributes<T>;

export type Saved = {
  id: string
}

export type Album = {
  title: string
  photos: Photo[]
}

export type SavedAlbum = Saved & Album

export type User = {
  email: string
  name: string
  lastName: string
}

export type Photo = {
  url: string
  name: string
}

export type Index = Record<string, SavedAlbum>

export type Tasks = Record<string, number | null>
