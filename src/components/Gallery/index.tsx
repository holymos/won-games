import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import SlickSlider from "react-slick";

import { ArrowBackIos as ArrowLeft } from "@styled-icons/material-outlined/ArrowBackIos";
import { ArrowForwardIos as ArrowRight } from "@styled-icons/material-outlined/ArrowForwardIos";
import { Close } from "@styled-icons/material-outlined/Close";

import { Slider, SliderSettings } from "components/Slider";
import * as S from "./styles";

const commonSettings: SliderSettings = {
  arrows: true,
  infinite: false,
  lazyLoad: "ondemand",
  nextArrow: <ArrowRight aria-label="Next image" />,
  prevArrow: <ArrowLeft aria-label="Previous image" />
};

const settings: SliderSettings = {
  ...commonSettings,
  slidesToShow: 4,
  responsive: [
    {
      breakpoint: 1375,
      settings: {
        arrows: false,
        slidesToShow: 3.2,
        draggable: true
      }
    },
    {
      breakpoint: 1024,
      settings: {
        arrows: false,
        slidesToShow: 2.2,
        draggable: true
      }
    },
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        slidesToShow: 2.2,
        draggable: true
      }
    }
  ]
};

const modalsettings: SliderSettings = {
  ...commonSettings,
  slidesToShow: 1
};

export type GalleryImageProps = {
  src: string;
  label: string;
};

export type GalleryProps = {
  items: GalleryImageProps[];
};

export function Gallery({ items }: GalleryProps) {
  const [isOpen, setisOpen] = useState(false);
  const slider = useRef<SlickSlider>(null);

  useEffect(() => {
    const handleKeyUp = ({ key }: KeyboardEvent) => {
      key === "Escape" && setisOpen(false);
    };

    window.addEventListener("keyup", handleKeyUp);

    return () => window.removeEventListener("keyup", handleKeyUp);
  }, []);

  return (
    <S.Wrapper>
      <Slider settings={settings} ref={slider}>
        {items.map((item, index) => (
          <Image
            role="button"
            key={`thumb-${item.label}`}
            src={item.src}
            alt={`Thumb - ${item.label}`}
            width={295}
            height={165}
            onClick={() => {
              setisOpen(true);
              slider.current!.slickGoTo(index, true);
            }}
          />
        ))}
      </Slider>

      <S.Modal isOpen={isOpen} aria-label="modal" aria-hidden={!isOpen}>
        <S.Close
          role="button"
          aria-label="Close modal"
          onClick={() => setisOpen(false)}
        >
          <Close size={40} />
        </S.Close>

        <S.Content>
          <Slider settings={modalsettings} ref={slider}>
            {items.map((item: GalleryImageProps) => (
              <Image
                key={`gallery-${item.label}`}
                src={item.src}
                alt={item.label}
                width={1200}
                height={675}
              />
            ))}
          </Slider>
        </S.Content>
      </S.Modal>
    </S.Wrapper>
  );
}
