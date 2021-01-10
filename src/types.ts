export type Stylable = {
  className?: string;
};

export type Extend<T extends HTMLElement> = React.HTMLProps<T> & React.HTMLAttributes<T>;

export type Album<T = string> = {
  title: string
  photos: T[],
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

export type Stat = {
  count: number
}

export type Index = Record<string, string[]>