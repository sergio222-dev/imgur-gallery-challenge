export interface ImageAggregate {
  id: string;
  title: string;
  description: string;
  link: string;
  type: 'video' | 'image'
  upVote: number;
  downVote: number;
  score: number;
}
