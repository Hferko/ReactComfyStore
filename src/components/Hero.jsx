import { Link } from 'react-router-dom';

import hero1 from '../assets/hero1.webp';
import hero2 from '../assets/hero2.webp';
import hero3 from '../assets/hero3.webp';
import hero4 from '../assets/hero4.webp';

const carouselImages = [hero1, hero2, hero3, hero4];

const Hero = () => {
  return (
    <div className='grid lg:grid-cols-2 gap-24 items-center text-center'>
      <div>
        <h1 className='max-w-2xl text-4xl font-bold tracking-tight sm:text-3xl'>
          Megváltoztatjuk az emberek vásárlási szokásait - Comfy Shop
        </h1>
        <p className='mt-8 max-w-xl text-lg leading-8 text-justify'>
          Otthon az, ahova hazatérsz. Ahol valaki vár este. Ahol ismered a fal kopásait, a szőnyeg foltjait, a bútorok apró nyikorgásait. Ahol úgy fekszel le az ágyba, hogy nem csak alszol, hanem pihensz. Nem csak pihensz, hanem kipihened magad. <br />
          Nálunk minőségi bútorokat talál.
        </p>
        <div className="mt-8">
          <Link to='/products' className='btn btn-primary'>
            Termékeink
          </Link>
        </div>
      </div>
      <div tabIndex={1}
        className='hidden h-[28rem] lg:carousel carousel-center p-4 space-x-4 bg-neutral rounded-box'>
        {carouselImages.map((img) => {
          return (
            <div key={img} className="carousel-item">
              <img src={img} className='rounded-box h-full w-80 object-cover' />
            </div>
          );
        })}
      </div>
    </div>
  )
}
export default Hero;