import { Card, CardActionArea, CardContent, Skeleton, Typography } from "@mui/material";
import styles from './CardImage.module.scss';

interface CardImageProperties {
  src: string;
  type: 'video' | 'image';
  title: string;
  loading?: boolean;
  onClick?: (id: string) => void;
  id: string;
}

export default function CardImage(props: CardImageProperties) {
  const {src, type, title, loading, onClick, id} = props;

  const handleClick = () => {
    onClick && onClick(id);
  }

  return (
    <div className={ styles['card-container'] }>
      <Card elevation={ 4 } className={ `${ styles['card-container-root'] }` }>
        <CardActionArea onClick={handleClick} classes={ {
          focusHighlight: styles['card-container-focus']
        } }>
          { loading
            ? <Skeleton animation="wave" sx={{ height: 400 }} variant="rectangular"/>
            : (
              <>
                {type === 'image'
                  ? (<img loading="lazy" src={ src } alt="a" className={ styles['card-image'] }/>)
                  : (<video autoPlay playsInline muted loop className={ styles['card-image'] }>
                    <source src={ src } type="video/mp4"/>
                  </video>)
                }
              </>
            )
          }
          <CardContent>
            <Typography variant="body2" className="font-bold" component="div">{ title }</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  )
}
