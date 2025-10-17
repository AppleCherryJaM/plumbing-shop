import { useEffect, useRef, useState } from "react";
import {
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
  styled,
  Container
} from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Circle as CircleIcon,
  CircleOutlined as CircleOutlinedIcon
} from "@mui/icons-material";
import { ProductItem, Slide } from "../components";

// Styled components
const CarouselContainer = styled(Box)({
  position: "relative",
  width: "100%"
});

const ProductsCarousel = styled(Box)({
  position: "relative",
  display: "flex",
  alignItems: "center",
  width: "100%"
});

const CarouselViewport = styled(Box)({
  width: "100%",
  overflow: "hidden",
  flex: 1
});

const CarouselTrack = styled(Box)({
  display: "flex",
  transition: "transform 0.5s ease",
  gap: "16px"
});

const CarouselItem = styled(Box)({
  flex: "0 0 auto",
  display: "flex"
});

const NavigationButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[4],
  border: `1px solid ${theme.palette.divider}`,
  zIndex: 10,
  width: 48,
  height: 48,
  "&:hover": {
    backgroundColor: "#add8e6",
    color: theme.palette.primary.contrastText
  },
  "&:disabled": {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled
  }
}));

const DotButton = styled(IconButton)(({ theme, active }) => ({
  padding: "4px",
  color: active ? theme.palette.primary.main : theme.palette.action.active,
  "&:hover": {
    backgroundColor: theme.palette.action.hover
  }
}));

const BannerContainer = styled(Box)({
  position: "relative",
  width: "100%",
  height: "400px"
});

// Обертка для выравнивания с основным контентом
const ContentAlignedContainer = styled(Container)(({ theme }) => ({
  position: "relative",
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  }
}));

const Carousel = ({ content, type = "default" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [itemWidth, setItemWidth] = useState(0);
  const carouselRef = useRef(null);
  const viewportRef = useRef(null);
  const containerRef = useRef(null);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('xl'));
  
  const itemsToShow = isMobile ? 1 : isTablet ? 3 : 5;

  // Рассчитываем ширину элемента
  useEffect(() => {
    if (!carouselRef.current || type !== "default") return;

    const updateItemWidth = () => {
      const viewportWidth = viewportRef.current.offsetWidth;
      const gap = 16;
      const calculatedWidth = (viewportWidth - gap * (itemsToShow - 1)) / itemsToShow;
      setItemWidth(calculatedWidth);
    };

    updateItemWidth();

    const handleResize = () => {
      updateItemWidth();
      if (carouselRef.current) {
        carouselRef.current.style.transform = `translateX(-${currentIndex * (itemWidth + 16)}px)`;
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentIndex, type, itemWidth, itemsToShow]);

  // Плавная анимация скроллинга
  useEffect(() => {
    if (!carouselRef.current || type !== "default" || itemWidth === 0) return;

    const translateValue = currentIndex * (itemWidth + 16);
    carouselRef.current.style.transition = isAnimating ? "transform 0.5s ease" : "none";
    carouselRef.current.style.transform = `translateX(-${translateValue}px)`;
  }, [currentIndex, type, isAnimating, itemWidth]);

  // Функции для карусели товаров
  const toPrevSlide = () => {
    if (isAnimating || content.data.length <= itemsToShow) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => Math.max(0, prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const toNextSlide = () => {
    if (isAnimating || content.data.length <= itemsToShow) return;
    setIsAnimating(true);
    setCurrentIndex((prev) =>
      Math.min(content.data.length - itemsToShow, prev + 1)
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Функции для баннера
  const toPrevBanner = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) =>
      prev === 0 ? content.data.length - 1 : prev - 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const toNextBanner = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) =>
      prev === content.data.length - 1 ? 0 : prev + 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const toSlide = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleSlideClick = (e) => {
    e.preventDefault();
    console.log("Slide clicked");
  };

  const showNavigation = type === "default" && content.data.length > itemsToShow;

  if (type === "banner") {
    return (
      <BannerContainer>
        <Slide
          slide={content.data[currentIndex]}
          isActive={true}
          onClick={handleSlideClick}
        />

        {content.data.length > 1 && (
          <>
            <NavigationButton
              onClick={toPrevBanner}
              disabled={isAnimating}
              sx={{ left: 16 }}
              aria-label="Предыдущий слайд"
            >
              <ChevronLeftIcon />
            </NavigationButton>

            <NavigationButton
              onClick={toNextBanner}
              disabled={isAnimating}
              sx={{ right: 16 }}
              aria-label="Следующий слайд"
            >
              <ChevronRightIcon />
            </NavigationButton>

            <Box
              sx={{
                position: "absolute",
                bottom: 16,
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: 1,
                // backgroundColor: "rgba(255, 255, 255, 0.8)", // Фон для лучшей видимости
                borderRadius: "20px",
                padding: "4px 8px",
                backdropFilter: "blur(4px)"
              }}
            >
              {content.data.map((_, index) => (
                <DotButton
                  key={index}
                  onClick={() => toSlide(index)}
                  disabled={isAnimating}
                  active={index === currentIndex}
                  aria-label={`Перейти к слайду ${index + 1}`}
                >
                  {index === currentIndex ? 
                    <CircleIcon fontSize="small" sx={{ color: "#add8e6" }} /> : 
                    <CircleOutlinedIcon fontSize="small" />
                  }
                </DotButton>
              ))}
            </Box>
          </>
        )}
      </BannerContainer>
    );
  }

  return (
    <ContentAlignedContainer ref={containerRef} maxWidth="xl">
      <CarouselContainer>
        <ProductsCarousel>
          {showNavigation && (
            <NavigationButton
              onClick={toPrevSlide}
              disabled={isAnimating || currentIndex === 0}
              sx={{ 
                left: {
                  xs: -8,    // mobile
                  sm: -12,   // tablet
                  md: -16    // desktop
                }
              }}
              aria-label="Предыдущие товары"
            >
              <ChevronLeftIcon />
            </NavigationButton>
          )}

          <CarouselViewport ref={viewportRef}>
            <CarouselTrack ref={carouselRef}>
              {content.data.map((product) => (
                <CarouselItem
                  key={product.id}
                  sx={{ width: `${itemWidth}px` }}
                >
                  <Box sx={{ width: '100%', display: 'flex' }}>
                    <ProductItem product={product} />
                  </Box>
                </CarouselItem>
              ))}
            </CarouselTrack>
          </CarouselViewport>

          {showNavigation && (
            <NavigationButton
              onClick={toNextSlide}
              disabled={isAnimating || currentIndex >= content.data.length - itemsToShow}
              sx={{ 
                right: {
                  xs: -8,    // mobile
                  sm: -12,   // tablet  
                  md: -16    // desktop
                }
              }}
              aria-label="Следующие товары"
            >
              <ChevronRightIcon />
            </NavigationButton>
          )}
        </ProductsCarousel>
      </CarouselContainer>
    </ContentAlignedContainer>
  );
};

export default Carousel;