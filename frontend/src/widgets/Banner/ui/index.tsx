import { Button } from 'flowbite-react';
import pc from './../../../assets/pc.webp';

export const Banner = () => {
  return (
    <div className="flex items-center justify-between py-[50px]">
      <div>
        <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Готов захвату? Наши игровые компьютеры — твое оружие для победы в
          каждой битве!
        </h2>
        <Button className="uppercase" gradientDuoTone="purpleToBlue">
          собрать компьютер
        </Button>
      </div>
      <img src={pc} alt="pc" />
    </div>
  );
};
