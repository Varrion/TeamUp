import {Carousel} from "react-bootstrap";

const CustomCarousel = (props) => {
    return (
        <Carousel fade>
            {props.children}
        </Carousel>
    )
}

export default CustomCarousel;