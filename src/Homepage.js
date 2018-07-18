import React, {Component} from 'react';
import ReactLoading from "react-loading";
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Activity from './com/Activity';
import Typography from '@material-ui/core/Typography';
import Sliders from './Sliders/components/Sliders';
import styled from "tachyons-components";

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'normal',
        overflow: 'hidden',
        // alignItems: 'start'
    },
});

const Section = styled('div')`
flex flex-wrap content-center justify-center w-100 h-100`;

export const Article = styled('div')`
w-25 ma2 h4 items-center justify-center flex flex-column flex-wrap`;

export const Prop = styled('h3')`
f5 f4-ns mb0 white`;

const Img = [
    {
        src: 'https://steamuserimages-a.akamaihd.net/ugc/928183771923008568/3B8DAE51B21FB04474D50BC3492219BECC3862F6/?interpolation=lanczos-none&output-format=jpeg&output-quality=95&fit=inside%7C637%3A358&composite-to=*,*%7C637%3A358&background-color=black'
    },
    {
        src: 'https://lumiere-a.akamaihd.net/v1/images/r_piratesofthecaribbeandeadmentellnotales_header_postst_a2b0f97a.jpeg?region=0,0,2048,803'
    },
    {
        src: 'http://tu.qiumibao.com/v/img/180518/206969_01133852974.jpg'
    }
];

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            page: 1,
        }
    }

    componentDidMount() {
        const {page} = this.state;
        const url = `http://47.106.23.224:30005/Ticket/QueryShowPage?pagenumber=${page}`;
        fetch(url, {
            method: 'GET',
            credentials: "include",
        })
            .then(response => response.json())
            .then(data => this.setState({data: data.content}))
            .catch(e => console.log(e));
    }

    render() {
        const {classes} = this.props;
        const {data} = this.state;

        console.log(data);

        const loading = (
            <Section>
                <Article>
                    <ReactLoading type="bars" color="#fff"/>
                    <Prop>Loading</Prop>
                </Article>
            </Section>
        );

        const activities = (

            <div className={classes.root}>
                {
                    data.map((s, i) => {
                        return (
                            <div className='animated fadeIn'>
                                <Activity card={s} key={i}/>
                            </div>
                        );
                    })
                }
            </div>
        );

        const toShow = (
            <div>
                {data.length === 0 ? loading : activities}
            </div>
        );

        return (
            <div>
                <Sliders
                    images={Img}
                    speed={2}
                    delay={3}
                    autoPlay={true}
                    autoParse={true}
                />
                <br/>
                <Typography variant="title" color="inherit" align='center' noWrap>
                    热门票品
                </Typography>
                <br/>
                {toShow}
            </div>
        )
    }
}

Homepage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Homepage);