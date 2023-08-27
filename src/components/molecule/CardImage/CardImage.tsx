import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import styles from './CardImage.module.scss';

interface CardImageProperties {
  src: string;
  type: 'video' | 'image';
  title: string;
}

export default function CardImage({src, type, title} : CardImageProperties) {
  return (
    <div className={styles['card-container']}>
      <Card elevation={4} className={`${styles['card-container-root']}`}>
        <CardActionArea classes={{
          focusHighlight: styles['card-container-focus']
        }} >
          {type === 'image'
            ? (<img src={src} alt="a" className={styles['card-image']} />)
            : (<video autoPlay playsInline muted loop className={styles['card-image']}>
              <source src={src} type="video/mp4" />
            </video>)
          }
          <CardContent>
            <Typography variant="body2" className="font-bold" component="div">{title}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  )
}
