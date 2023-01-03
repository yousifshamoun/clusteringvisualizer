import React from "react";
import {
    AppBar,
    Button,
    Toolbar,
    Grid,
    Box,
    Typography,
    SvgIcon,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import kMeans from "../Algorithms/Clustering/kMeans";
import meanShift from "../Algorithms/Clustering/meanShift";
import RandomMenu from "./RandomMenu";
import AlgorithmMenu from "./AlgorithmMenu";
import SpeedController from "./SpeedController";
import { RootState } from "../reduxStore/reducers/index";
import { connect, ConnectedProps } from "react-redux";
import CentroidSlider from "./CentroidSlider";
import WindowSizeSlider from "./WindowSizeSlider";
import dbScan from "../Algorithms/Clustering/dbScan";
import EpsilonSlider from "./EpsilonSlider";
import MinPointsSlider from "./MinPointsSlider";
import DarkModeButton from "./DarkModeButton/DarkModeButton";
const theme = createTheme({
    palette: {
        primary: {
            main: "#34495E",
        },
        secondary: {
            main: "#1ABC9C",
            contrastText: "#fff",
        },
    },
});
const mapState = (state: RootState) => ({
    global: state.global,
});
const mapDispatch = {
    pause: () => ({
        type: "PAUSE",
    }),
    resume: () => ({
        type: "RESUME",
    }),
    reset: () => ({
        type: "RESET",
    }),
};
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
//Variables
type NavBarState = { noAlgo: boolean };
class NavBar extends React.Component<PropsFromRedux, NavBarState> {
    constructor(props: PropsFromRedux) {
        super(props);
        this.state = {
            noAlgo: true,
        };
    }
    handleStart = () => {
        switch (this.props.global.algorithm) {
            case "kmeans":
                kMeans();
                this.setState({
                    noAlgo: false,
                });
                break;
            case "meanshift":
                meanShift();
                this.setState({
                    noAlgo: false,
                });
                break;
            case "dbscan":
                dbScan();
                this.setState({
                    noAlgo: false,
                });
                break;
            default:
                this.setState({
                    noAlgo: true,
                });
        }
    };
    public render() {
        return (
            <ThemeProvider theme={theme}>
                <AppBar
                    elevation={0}
                    className="appbar"
                    color="primary"
                    style={{ color: "white", minHeight: "80px" }}
                >
                    <Typography component="div" mt={2} ml={2}>
                        <Box
                            sx={{ fontSize: "h5.fontSize", fontWeight: "bold" }}
                        >
                            Clustering Visualizer
                        </Box>
                    </Typography>
                    <Toolbar>
                        <Grid
                            container
                            justifyContent="center"
                            alignItems="center"
                            style={{
                                height: "100%",
                                position: "relative",
                                top: "8px",
                            }}
                        >
                            <Grid
                                container
                                justifyContent="center"
                                alignItems="center"
                                item
                                xs={12}
                                md={10}
                                xl={9}
                            >
                                <AlgorithmMenu {...this.props.global} />
                                <Box ml="20px">
                                    <RandomMenu {...this.props.global} />
                                </Box>
                                <Box ml="20px">
                                    {this.props.global.started ? (
                                        this.props.global.paused ? (
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={this.props.resume}
                                            >
                                                Resume
                                            </Button>
                                        ) : (
                                            <Button
                                                color="secondary"
                                                variant="contained"
                                                onClick={this.props.pause}
                                            >
                                                Pause
                                            </Button>
                                        )
                                    ) : (
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={this.handleStart}
                                            disabled={this.props.global.started}
                                        >
                                            {this.state.noAlgo &&
                                            !this.props.global.algorithm
                                                ? "Select an Algorithm"
                                                : this.props.global.points
                                                      .length <= 2
                                                ? "Plot points"
                                                : "Visualize !"}
                                        </Button>
                                    )}
                                </Box>
                                {this.props.global.algorithm === "kmeans" ? (
                                    <span>
                                        Set k clusters
                                        <Box ml="20px">
                                            <CentroidSlider />
                                        </Box>
                                    </span>
                                ) : null}
                                {this.props.global.algorithm === "meanshift" ? (
                                    <span>
                                        Set Window Size
                                        <Box ml="20px">
                                            <WindowSizeSlider />
                                        </Box>
                                    </span>
                                ) : null}
                                {this.props.global.algorithm === "dbscan" ? (
                                    <span>
                                        Set Epsilon
                                        <Box ml="20px">
                                            <EpsilonSlider />
                                        </Box>
                                    </span>
                                ) : null}
                                {this.props.global.algorithm === "dbscan" ? (
                                    <span>
                                        Set Min Points
                                        <Box ml="20px">
                                            <MinPointsSlider />
                                        </Box>
                                    </span>
                                ) : null}
                                <Box ml="20px">
                                    <SpeedController />
                                </Box>
                                <Box ml="20px">
                                    <Button
                                        variant="contained"
                                        disabled={this.props.global.started}
                                        onClick={this.props.reset}
                                    >
                                        RESET
                                    </Button>
                                </Box>
                                <Box ml="20px">
                                    <DarkModeButton />
                                </Box>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        );
    }
}

export default connector(NavBar);
