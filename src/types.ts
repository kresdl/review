export type Stylable = {
  className?: string;
};

export type Extend<T extends HTMLElement> = React.HTMLProps<T> & React.HTMLAttributes<T>;

export type Saved = {
  id: string
}

export type Titled = {
  title: string
}

export type Album = Saved & Titled & {
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
  path: string
}