import React, { Component } from 'react';
import NavBar from '../../components/NavBar/navBar';
import Footer from '../../components/Footer/footer';
import { Grid, Container, GridColumn, Image} from 'semantic-ui-react';
import content1 from '../../assessts/content1-1.PNG'
import content2 from '../../assessts/capture -2.PNG'
import content3 from '../../assessts/Capture-3.PNG'
import text1 from '../../assessts/text1.PNG'
import text2 from '../../assessts/text2.PNG'
import text3 from '../../assessts/text3.PNG'
import power from '../../assessts/power.PNG'
import middle1 from '../../assessts/middle1.PNG'
import middle2 from '../../assessts/middle2.PNG'
import middle3 from '../../assessts/middle3.PNG'
import midImage from '../../assessts/midImage.PNG'


class HomeBase extends Component {

    render() {
        return(
            <div>
                <NavBar />
                    <Grid columns={1} stackable>
                    <Grid.Column width="16">
                        <Container fluid /*style={{height:1000,backgroundImage:"url("+homeImage+")"}}*/>
                        {/* TODO :: ADD AN IMAGE */}
                        </Container>
                    </Grid.Column>
                    </Grid>
                    <Grid columns={3} stackable>
                        <GridColumn style={{width:"3%"}}>
                        </GridColumn>
                        <GridColumn width="5">
                            <center>
                            <Container >
                                <Image src={content1} />
                            </Container>
                            </center>
                        </GridColumn>
                        <GridColumn width="5">
                            <center>
                            <Container >
                                <Image src={content2} />
                            </Container>
                            </center>
                        </GridColumn>
                        <GridColumn width="5">
                            <center>
                            <Container >
                                <Image src={content3} />
                            </Container>
                            </center>
                        </GridColumn>
                    </Grid>

                    <Grid columns={3} stackable>
                        <GridColumn style={{width:"3%"}}>
                        </GridColumn>
                        <GridColumn width="5">
                            <center>
                            <Container >
                                <Image src={text1} />
                            </Container>
                            </center>
                        </GridColumn>
                        <GridColumn width="5">
                            <center>
                            <Container >
                                <Image src={text2} />
                            </Container>
                            </center>
                        </GridColumn>
                        <GridColumn width="5">
                            <center>
                            <Container >
                                <Image src={text3} />
                            </Container>
                            </center>
                        </GridColumn>
                    </Grid>

                    <Grid columns={1} stackable>
                        <GridColumn width="16">
                            <Container fluid>
                                <Image src={power} />
                            </Container>
                        </GridColumn>
                    </Grid>
                    <Grid columns={1} stackable>
                        <GridColumn width="16">
                            <Container fluid style={{padding:0}}>
                                <Image src={midImage} />
                            </Container>
                        </GridColumn>
                    </Grid>
                    <Grid columns={3} stackable>
                        <GridColumn style={{width:"3%"}}>
                        </GridColumn>
                        <GridColumn width="5">
                            <center>
                            <Container >
                                <Image src={middle1} />
                            </Container>
                            </center>
                        </GridColumn>
                        <GridColumn width="5">
                            <center>
                            <Container >
                                <Image src={middle2} />
                            </Container>
                            </center>
                        </GridColumn>
                        <GridColumn width="5">
                            <center>
                            <Container >
                                <Image src={middle3} />
                            </Container>
                            </center>
                        </GridColumn>
                    </Grid>
                <Footer />
            </div>
        )
    }
    

}

export default HomeBase;