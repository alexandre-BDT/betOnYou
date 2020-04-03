import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Dimensions,
  Text,
  FlatList,
  Image,
  View,
  Alert,
} from 'react-native';
import {Content, Button, Card, CardItem, Body, Right, Icon} from 'native-base';
import Foot from './Foot';
import Head from './Head';

const gameJson = require('./../conf/games.json');
const gameModeJson = require('./../conf/games_modes.json');
const platforms = require('./../conf/consoles.json');

const bet = [
  {amount: 20, image: require('./../assets/Mises/grisclair.png')},
  {amount: 50, image: require('./../assets/Mises/grisclair.png')},
  {amount: 100, image: require('./../assets/Mises/betbg.jpg')},
  {amount: 200, image: require('./../assets/Mises/betbg.jpg')},
  {amount: 500, image: require('./../assets/Mises/betbg.jpg')},
];

class Play extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGameId: '',
      selectedGameModeId: '',
      selectedPlatformId: '',
      selectedBetAmount: 0,
      gameName: '',
      gameModeId: '',
      platformId: '',
      modeUrl: [],
      open: false,
    };
  }

  getModes(modesId) {
    var mode = [];
    gameModeJson.map(item => {
      for (let i = 0; modesId[i]; i++) {
        if (modesId[i] === item.id) {
          mode.push({url: item.image_url, name: item.name, id: item.id});
        }
      }
    });
    return mode;
  }

  handleGameMode(item) {
    this.setState({platformId: ''});
    this.setState({gameName: item.item.name});
    this.setState({
      selectedPlatformId: item.item.consoles_ids,
      selectedGameId: item.item.id,
      selectedGameModeId: item.item.games_modes_ids,
    });
    if (
      this.state.selectedGameModeId !== undefined ||
      this.state.selectedGameModeId !== ''
    ) {
      var modes = this.getModes(item.item.games_modes_ids);
      if (modes.length != 0) {
        this.setState({modeUrl: modes, open: true});
      } else {
        this.setState({open: false});
      }
    }
  }

  handleSelecteGameMode(modeId) {
    this.setState({gameModeId: modeId, open: false});
  }

  renderGameMode() {
    return (
      <Card>
        <CardItem header style={styles.cardHeader}>
          <Text style={{color: 'white'}}>MODE DE JEU</Text>
          <Right>
            <Button
              light
              style={{
                backgroundColor: 'transparent',
                elevation: 0,
                height: 20,
              }}
              onPress={() => {
                this.setState({open: false});
              }}>
              <Icon name="cross" type="Entypo" />
            </Button>
          </Right>
        </CardItem>
        <CardItem style={{backgroundColor: '#718093', alignContent: 'center'}}>
          <Body>
            <FlatList
              horizontal
              style={{padding: 10}}
              data={this.state.modeUrl}
              showsHorizontalScrollIndicator={false}
              legacyImplementation={false}
              renderItem={item => {
                return (
                  <View>
                    <Button
                      style={styles.button}
                      onPress={() => this.handleSelecteGameMode(item.item.id)}>
                      <Image
                        style={styles.image}
                        source={{uri: item.item.url}}
                      />
                    </Button>
                    <Text
                      style={{
                        fontSize: 13,
                        color: 'white',
                        textAlign: 'center',
                      }}>
                      {item.item.name}
                    </Text>
                  </View>
                );
              }}
            />
          </Body>
        </CardItem>
      </Card>
    );
  }

  renderGames() {
    return (
      <FlatList
        horizontal
        data={gameJson}
        showsHorizontalScrollIndicator={false}
        legacyImplementation={false}
        renderItem={item => {
          return (
            <View>
              {this.state.selectedGameId === item.item.id ||
              this.state.selectedGameId.length == 0 ? (
                <Button
                  onPress={() => this.handleGameMode(item)}
                  style={styles.button}>
                  <Image
                    style={styles.image}
                    source={{uri: item.item.image_url}}
                  />
                </Button>
              ) : (
                <Button
                  onPress={() => this.handleGameMode(item)}
                  style={styles.opacityButton}>
                  <Image
                    style={styles.image}
                    source={{uri: item.item.image_url}}
                  />
                </Button>
              )}
              <Text style={{fontSize: 13, color: 'white', textAlign: 'center'}}>
                {item.item.name}
              </Text>
            </View>
          );
        }}
      />
    );
  }

  renderPlatforms() {
    return (
      <FlatList
        horizontal
        data={platforms}
        showsHorizontalScrollIndicator={false}
        legacyImplementation={false}
        renderItem={item => {
          if (this.state.platformId.length !== 0) {
            if (this.state.platformId === item.item.id) {
              return (
                <View>
                  <Button
                    onPress={() => {
                      this.setState({platformId: item.item.id});
                    }}
                    style={styles.button}>
                    <Image
                      style={styles.roundedImage}
                      source={{uri: item.item.image_url}}
                    />
                  </Button>
                  <Text
                    style={{fontSize: 13, color: 'white', textAlign: 'center'}}>
                    {item.item.name}
                  </Text>
                </View>
              );
            } else {
              return (
                <View>
                  <Button style={styles.opacityButton}>
                    <Image
                      style={styles.roundedImage}
                      source={{uri: item.item.image_url}}
                    />
                  </Button>
                  <Text
                    style={{
                      fontSize: 13,
                      color: 'white',
                      textAlign: 'center',
                    }}>
                    {item.item.name}
                  </Text>
                </View>
              );
            }
          } else {
            var check = false;
            for (let i = 0; this.state.selectedPlatformId[i]; i++) {
              if (this.state.selectedPlatformId[i] === item.item.id) {
                check = true;
              }
            }
            if (check) {
              return (
                <View>
                  <Button
                    onPress={() => {
                      this.setState({platformId: item.item.id});
                    }}
                    style={styles.button}>
                    <Image
                      style={styles.roundedImage}
                      source={{uri: item.item.image_url}}
                    />
                  </Button>
                  <Text
                    style={{
                      fontSize: 13,
                      color: 'white',
                      textAlign: 'center',
                    }}>
                    {item.item.name}
                  </Text>
                </View>
              );
            } else {
              return (
                <View>
                  <Button style={styles.opacityButton}>
                    <Image
                      style={styles.roundedImage}
                      source={{uri: item.item.image_url}}
                    />
                  </Button>
                  <Text
                    style={{
                      fontSize: 13,
                      color: 'white',
                      textAlign: 'center',
                    }}>
                    {item.item.name}
                  </Text>
                </View>
              );
            }
          }
        }}
        keyExtractor={item => item.id}
      />
    );
  }

  renderBets() {
    return (
      <FlatList
        horizontal
        data={bet}
        showsHorizontalScrollIndicator={false}
        legacyImplementation={false}
        renderItem={item => {
          return (
            <View>
              {this.state.selectedBetAmount === item.item.amount ||
              (this.state.selectedBetAmount === 0 &&
                item.item.amount <= 200) ? (
                <Button
                  style={styles.button}
                  onPress={() => {
                    this.setState({selectedBetAmount: item.item.amount});
                  }}>
                  <Image style={styles.roundedImage} source={item.item.image} />
                  <View style={styles.viewOver}>
                    <Text style={styles.textBet}>{item.item.amount}</Text>
                  </View>
                </Button>
              ) : (
                <Button
                  style={styles.opacityButton}
                  onPress={() => {
                    if (item.item.amount <= 200) {
                      this.setState({selectedBetAmount: item.item.amount});
                    } else {
                      Alert.alert("Vous n'avez pas assez de boycoin");
                    }
                  }}>
                  <Image style={styles.roundedImage} source={item.item.image} />
                  <View style={styles.viewOver}>
                    <Text style={styles.textBet}>{item.item.amount}</Text>
                  </View>
                </Button>
              )}
              <Text style={{fontSize: 13, color: 'white', textAlign: 'center'}}>
                BOYCOIN
              </Text>
            </View>
          );
        }}
      />
    );
  }

  checkValid() {
    if (
      this.state.selectedBetAmount &&
      this.state.platformId &&
      this.state.selectedGameId
    )
      return {
        check: true,
        info: {
          bet: this.state.selectedBetAmount,
          platforms: this.state.selectedPlatformId,
          game: this.state.gameName,
        },
      };
    else return {check: false, info: null};
  }

  render() {
    let {height, width} = Dimensions.get('window');
    return (
      <ImageBackground
        source={require('./../assets/bg.jpg')}
        style={{width, height}}>
        <Head
          navigation={this.props.navigation}
          route={this.props.route.name}
        />
        <Content>
          {this.state.open ? (
            <View style={{flex: 1}}>{this.renderGameMode()}</View>
          ) : (
            <View />
          )}
          <Text style={styles.text}>JEUX</Text>
          {this.renderGames()}
          <Text style={styles.text}>PLATEFORMES</Text>
          {this.renderPlatforms()}
          <Text style={styles.text}>MISES</Text>
          {this.renderBets()}
        </Content>
        <Foot
          navigation={this.props.navigation}
          route={this.props.route.name}
          check={this.checkValid()}
        />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 20,
    paddingTop: 30,
  },
  image: {
    height: 90,
    width: 90,
    marginLeft: 5,
    borderRadius: 50,
  },
  button: {
    height: 100,
    width: 100,
    backgroundColor: 'transparent',
    borderRadius: 50,
    elevation: 0,
    borderColor: 'orange',
  },
  opacityButton: {
    height: 100,
    width: 100,
    backgroundColor: 'transparent',
    borderRadius: 50,
    elevation: 0,
    borderColor: 'orange',
    opacity: 0.3,
  },
  platformsButton: {
    elevation: 0,
    backgroundColor: 'transparent',
    resizeMode: 'contain',
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  roundedImage: {
    borderRadius: 50,
    height: 90,
    width: 90,
    marginLeft: 5,
  },
  viewOver: {
    flex: 1,
    paddingLeft: 25,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  textBet: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
  },
  cardHeader: {
    backgroundColor: '#0a3d62',
    height: 20,
  },
});

export default Play;
