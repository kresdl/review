export type Stylable = {
  className?: string;
};

export type Extend<T extends HTMLElement> = React.HTMLProps<T> & React.HTMLAttributes<T>;

export type Album = {
  title: string
  photos: Photo[],
}

export type User = {
  email: string
  name: string
  lastName: string
  albums: Album[]
}

export type Photo = {
  url: string
  name: string
}

export type Index = Record<string, Photo[]>
