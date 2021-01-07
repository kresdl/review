export type Stylable = {
  className?: string;
};

export type Extend<T extends HTMLElement> = React.HTMLProps<T> & React.HTMLAttributes<T>;

export type Titled = {
  title: string
}

export type Indexed = {
  id: string
}

export type Album = Titled & Indexed & {
  photos: string[]
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