export type TProfileImageProps = {
  image?: string;
  onSelected: (imageId: number) => Promise<number>
}