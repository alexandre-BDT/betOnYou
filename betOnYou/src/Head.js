import React from 'react';
import {Header, Button} from 'native-base';
import {Image, StyleSheet, Text} from 'react-native';
import {Col, Grid} from 'react-native-easy-grid';

export default class Head extends React.Component {
  constructor(props) {
    super(props);
  }

  handleDiamond() {
    this.props.navigation.navigate('BackPageShop');
  }

  handleCoin() {
    this.props.navigation.navigate('BackPageProfil');
  }

  handleMedallion() {
    this.props.navigation.navigate('BackPageProfil');
  }

  render() {
    return (
      <Header style={styles.header}>
        <Grid>
          <Col>
            <Button
              style={styles.button}
              onPress={this.handleMedallion.bind(this)}>
              <Col size={2}>
                <Image
                  style={styles.acoin}
                  source={require('./../assets/Header/medallion.gif')}
                />
              </Col>
              <Col size={1}>
                <Text style={styles.text}>0/10</Text>
              </Col>
            </Button>
          </Col>
          <Col>
            <Button
              style={styles.button}
              onPress={this.handleDiamond.bind(this)}>
              <Col size={2}>
                <Image
                  style={styles.diamond}
                  source={require('./../assets/Header/diamond.gif')}
                />
              </Col>
              <Col>
                <Text style={styles.text}>50</Text>
              </Col>
            </Button>
          </Col>
          <Col>
            <Button style={styles.button} onPress={this.handleCoin.bind(this)}>
              <Col size={2}>
                <Image
                  style={styles.meddallion}
                  source={require('./../assets/Header/acoin.gif')}
                />
              </Col>
              <Col size={1}>
                <Text style={styles.text}>200</Text>
              </Col>
            </Button>
          </Col>
        </Grid>
      </Header>
    );
  }
}

const styles = StyleSheet.create({
  acoin: {
    height: 12,
    width: 12,
    resizeMode: 'contain',
  },
  diamond: {
    height: 12,
    width: 12,
    resizeMode: 'contain',
  },
  meddallion: {
    height: 12,
    width: 12,
    resizeMode: 'contain',
  },
  header: {
    backgroundColor: '#95afc0',
    height: 80,
  },
  button: {
    backgroundColor: '#0a3d62',
    marginTop: 20,
    borderRadius: 150,
    flex: 0.5,
  },
  text: {
    color: 'white',
  },
});
