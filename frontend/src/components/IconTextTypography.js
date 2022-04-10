import Typography from "@material-ui/core/Typography";
import { Col, Row } from "react-bootstrap";
import { Box } from "@material-ui/core";

const IconTextTypography = (props) => {
    const unknown = "Unknown";

    return (
        <Typography component={"div"} color={"textSecondary"}>
            <Row className={props.class}>

                <Col>
                    <Box className={"font-weight-bold"} style={{ textAlign: "start", marginLeft: "10px" }}>
                        <span style={{ marginRight: "10px" }}>{props.icon} </span>
                        <span >{props.caption}</span>
                    </Box>
                    <Box style={{ textAlign: "start", marginLeft: "50px" }}>
                        {props.text ? props.text : unknown}
                    </Box>
                </Col>
            </Row>
        </Typography>
    )
}

export default IconTextTypography;
