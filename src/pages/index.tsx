import { Inter } from 'next/font/google'
import { useImages } from "@/lib/image/application/adapter/useImages";
import { useEffect } from "react";
import CardImage from "@/components/molecule/CardImage/CardImage";
import ModalWrapper from "@/components/organism/ModalWrapper/ModalWrapper";
import AppBar from "@/components/organism/AppBar/AppBar";

const inter = Inter({subsets: ['latin']})

export default function Home() {

  const {
    images,
    window,
    isLoading,
    getGallery,
    handleSelectImage,
  } = useImages();

  useEffect(() => {
    getGallery();
    if ( window !== undefined ) history.scrollRestoration = 'manual';
  }, []);

  return (
    <>
      <AppBar/>
      <main className={ `${ inter.className } container mx-auto m-[64px]` }>
        <div className="masonry sm:masonry-sm md:masonry-md lg:masonry-lg">
          { isLoading && Array(15).fill({
            id: '',
            title: '',
            link: '',
            type: 'image',
            description: '',
          }).map((_, i) => (<CardImage key={ `${ _.id } ${ i }` } id="" src="" type="image" title="" loading/>)) }

          { !isLoading && images.map((image) => (
            <CardImage
              onClick={ handleSelectImage }
              id={ image.id }
              type={ image.type }
              src={ image.link }
              title={ image.title }
              key={ image.id }
            />
          )) }

        </div>
      </main>
      <ModalWrapper/>
    </>
  )
}
