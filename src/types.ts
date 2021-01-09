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

export type Album<T = string> = Titled & Indexed & {
  photos: T[],
  dummy?: boolean
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
  dummy?: boolean
}

export type Stat = {
  count: number
}

export type Index = Record<string, Photo[]>