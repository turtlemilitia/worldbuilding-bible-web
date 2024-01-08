export type THeaderWrapperProps = {
  page?: string,
  coverImage?: string,
  onCoverImageSelected?: (imageId: number) => Promise<any>;
}