import { useDispatch, useSelector } from "@/lib/shared/application/adapter";
import CardImagePreview from "@/components/molecule/CardImagePreview/CardImagePreview";
import { selectCurrentImage, selectImage } from "@/lib/image/application/adapter/slice";
import { id } from "postcss-selector-parser";

export default function ModalWrapper() {
  const dispatch = useDispatch();
  const image = useSelector(selectCurrentImage);
  const { id, link, title, description, upVote, downVote, score, type} = image;

  const handleClose = () => {
    dispatch(selectImage(''));
  }

  return (
    <CardImagePreview
      open={id !== ''}
      title={title}
      description={description}
      upVote={upVote}
      downVote={downVote}
      score={score}
      link={link}
      type={type}
      onClose={handleClose}
    />
  )

}
