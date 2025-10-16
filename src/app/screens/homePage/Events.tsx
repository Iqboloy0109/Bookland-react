// Events.tsx
import { Box, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { plans } from "../../../lib/data/plans";
import styled, { keyframes } from "styled-components";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

SwiperCore.use([Autoplay, Navigation, Pagination]);

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const scaleUp = keyframes`
  from { transform: scale(0.95); }
  to { transform: scale(1); }
`;

// Styled Components
const EventsFrame = styled.div`
  width: 100%;
  height: 745px;
  background: #f8f8ff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EventsMain = styled(Stack)`
  position: relative;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CategoryTitle = styled.span`
  font-family: "Dancing Script", cursive;
  font-weight: 700;
  font-size: 36px;
  line-height: 43px;
  color: #2e7d32;
  margin-bottom: 40px;
  animation: ${fadeIn} 0.6s ease-out;
`;

const EventSlide = styled(SwiperSlide)`
  position: relative;
  width: 500px;
  height: 500px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
  }
`;

const EventImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${EventSlide}:hover & {
    transform: scale(1.05);
  }
`;

const EventDescription = styled(Box)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border-radius: 0 0 12px 12px;
  animation: ${fadeIn} 0.5s ease-out;
`;

const EventTitle = styled.strong`
  display: block;
  font-size: 22px;
  font-weight: 700;
  color: #2e7d32;
  margin-bottom: 8px;
`;

const EventOrganizer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;

  img {
    width: 20px;
    margin-right: 10px;
  }
`;

const OrganizerText = styled.p`
  font-family: "GT Walsheim Pro", sans-serif;
  font-size: 16px;
  color: #140342;
  margin: 0;
`;

const EventText = styled.p`
  font-family: "GT Walsheim Pro", sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #4f547b;
  margin-bottom: 16px;
`;

const EventInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  font-family: "GT Walsheim Pro", sans-serif;
  font-size: 14px;
  color: #4f547b;

  img {
    margin-right: 8px;
    width: 16px;
    height: 16px;
  }
`;

const NavigationContainer = styled(Box)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  margin: 40px 0;
  height: 25px;
`;

const PaginationDots = styled.div`
  position: relative;
  width: auto;
  display: flex;
  justify-content: center;
  gap: 8px;

  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    background: #e0e0e0;
    opacity: 1;
    transition: all 0.3s ease;

    &-active {
      background: #2e7d32;
      transform: scale(1.2);
    }
  }
`;

const NavButton = styled.img`
  cursor: pointer;
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }

  &.swiper-button-next {
    transform: rotate(180deg);

    &:hover {
      transform: rotate(180deg) scale(1.2);
    }
  }
`;

export default function Events() {
  return (
    <EventsFrame>
      <EventsMain>
        <CategoryTitle>Bookstore Events</CategoryTitle>

        <Swiper
          slidesPerView={"auto"}
          centeredSlides={true}
          spaceBetween={30}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: true,
          }}
          style={{
            width: "100%",
            padding: "0 20px",
          }}
        >
          {plans.map((value, index) => (
            <EventSlide key={index}>
              <EventImage src={value.img} alt={value.title} />
              <EventDescription>
                <EventTitle>{value.title}</EventTitle>
                <EventOrganizer>
                  <img src="/icons/speaker.svg" alt="speaker" />
                  <OrganizerText>{value.author}</OrganizerText>
                </EventOrganizer>
                <EventText>{value.desc}</EventText>
                <EventInfo>
                  <InfoItem>
                    <img src="/icons/calendar.svg" alt="date" />
                    {value.date}
                  </InfoItem>
                  <InfoItem>
                    <img src="/icons/location.svg" alt="location" />
                    {value.location}
                  </InfoItem>
                </EventInfo>
              </EventDescription>
            </EventSlide>
          ))}
        </Swiper>

        <NavigationContainer>
          <NavButton
            src="/icons/arrow-right.svg"
            className="swiper-button-prev"
            alt="previous"
          />
          <PaginationDots className="swiper-pagination" />
          <NavButton
            src="/icons/arrow-right.svg"
            className="swiper-button-next"
            alt="next"
          />
        </NavigationContainer>
      </EventsMain>
    </EventsFrame>
  );
}
