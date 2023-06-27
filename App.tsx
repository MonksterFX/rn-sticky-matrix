import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { SyncedScrollView } from './src/components/SyncedScrollView';
import { SyncedScrollViewContext, syncedScrollViewState } from './src/context/SyncedScrollViewContext';

const BLOCK_SIZE = 100

const Row = (props) => {
  const data = [...Array(10).keys()]
  return <View style={styles.row}>
    {data.map(() => <Cell></Cell>)}
  </View>
}

const Cell = (props) => {
  return <View style={{...styles.cell, ...props?.style}}></View>
}


export default function App() {

  const data = [...Array(1000).keys()].map((v) => `#${v}`)

  return (
    <SyncedScrollViewContext.Provider value={syncedScrollViewState}>
      <SafeAreaView style={styles.container}>
        <View>
          <SyncedScrollView currentScrollViewId={0} style={styles.columnHeader} stickyHeaderIndices={[0]} bounces={false} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            <Cell style={{backgroundColor: 'green'}}></Cell>
            {data.map(() => <Cell></Cell>)}
          </SyncedScrollView>
        </View>
        <View>
          <ScrollView horizontal bounces={false} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            <SyncedScrollView currentScrollViewId={1} style={styles.content} stickyHeaderIndices={[0]} bounces={false} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
              <Row style={{backgroundColor: 'green'}}></Row>
              {data.map(() => <Row></Row>)}
            </SyncedScrollView>
          </ScrollView>
        </View>
      </SafeAreaView>
    </SyncedScrollViewContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  cell: {
    width: BLOCK_SIZE - 16,
    height: BLOCK_SIZE - 16,
    margin: 8,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 16
  },
  columnHeader: {
    backgroundColor: 'red',
    width: BLOCK_SIZE
  },
  content: {
    backgroundColor: '#fbb',
    flexGrow: 1
  }
});
