import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import styles from './CardImagePreview.module.scss';

interface CardImagePreviewProperties {
  open: boolean;
  title: string;
  description: string;
  upVote: number;
  downVote: number;
  score: number;
  link: string;
  type: 'image' | 'video';
  onClose: () => void;
}

export default function CardImagePreview(props: CardImagePreviewProperties) {
  const {open, title, description, upVote, downVote, score, link, type, onClose} = props;


  return (
    <Dialog
      open={ open }
      onClose={ onClose }
      classes={{
        paper: styles['paper-container']
      }}
    >
      <DialogTitle>
        <Typography variant="h6">{ title }</Typography>
      </DialogTitle>
      <DialogContent>
        { type === 'image'
          ? (<img className={ styles['media-container'] } src={ link } alt="a"/>)
          : (<video className={ styles['media-container'] } autoPlay playsInline loop>
            <source src={ link } type="video/mp4"/>
          </video>)
        }
        <Typography>{ description }</Typography>
        <div className={styles['result-container']}>
          👍{ upVote } 👎{ downVote } 🎯 { score }
        </div>
      </DialogContent>
    </Dialog>
  )
}
