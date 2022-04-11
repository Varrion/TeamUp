import {Container} from "@material-ui/core";

const Route = props => {
    return (
        props.container
            ? <Container maxWidth={props.size ?? "xl"} className={"pt-3 pb-3"}>
                {props.children}
            </Container>
            : props.children
    )
}

export default Route;
