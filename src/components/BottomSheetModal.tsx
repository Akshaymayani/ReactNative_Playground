/* eslint-disable react-hooks/exhaustive-deps */
import { Keyboard, StyleSheet, View, useWindowDimensions } from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';

import BottomSheet from '@gorhom/bottom-sheet';

const BottomSheetModal = ({todoInfo, visible, onClose ,children}: any) => {
  const sheetRef = useRef<BottomSheet>(null);
  const { width, height } = useWindowDimensions();
  const maxScrollHeight = todoInfo ? '30%' : '90%';
  // const {
  //     control,
  //     handleSubmit,
  //     reset,
  //     formState: { errors },
  // } = useForm();
  // const [categoryOpen, setCategoryOpen] = useState(false);

  // const categories = [
  //     { label: 'Work', value: 'work' },
  //     { label: 'Personal', value: 'personal' },
  //     { label: 'Study', value: 'study' },
  //     { label: 'Important', value: 'important' },
  //     { label: 'Career', value: 'career' },
  //     { label: 'Daily', value: 'daily' },
  // ];

  // const onSubmit = (data: any) => {
  //     reset();
  //     console.log({ data });
  // };

  const styles = StyleSheet.create({
      OuterContainer: {
          height,
          width,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      ModalContainer: {
          position: 'relative',
          minHeight: 400,
          width: '98%',
          backgroundColor: 'white',
          borderRadius: 10,
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          padding: 20,
          justifyContent: 'center',
          marginVertical:4,
      },
      Header: {
          fontSize: 22,
          fontWeight: 'bold',
          marginBottom: 20,
          textAlign: 'center',
      },
      CloseButton: {
          position: 'absolute',
          top: 20,
          right: 20,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1,
      },
      DropDownPickerContainer: {
          height: 40,
          marginBottom: 10,
          zIndex: 19999,
      },
      DropDownStyle: {
          backgroundColor: '#ffffff',
          borderColor: '#ccc',
          borderWidth: 1,
          borderRadius: 5,
      },
      DropDownLabel: {
          color: '#333',
          fontSize: 16,
      },
      DropDownItemStyle: {
          justifyContent: 'flex-start',
      },
      DropDownSelectedStyle: {
          backgroundColor: '#e0f7fa',
      },
      contentContainer: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,
      },
      itemContainer: {
        padding: 6,
        margin: 6,
        backgroundColor: '#eee',
      },
      headerContainer: {
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
      },
      handle: {
        width: 90,
        height: 5,
        borderRadius: 5,
        backgroundColor: 'black',
      },
  });
  const snapPoints = useMemo(() => ['1%', todoInfo?'30%':'50%', maxScrollHeight], [maxScrollHeight]);

  const handleSheetChange = useCallback((index: number) => {
    console.log('handleSheetChange', index);

    // Automatically close when the sheet is dragged to the bottom
    if (index === -1) {
      Keyboard.dismiss();
      onClose();
    } else if (index === 0) {
      sheetRef.current?.close();
    }
  }, [onClose]);

  useEffect(() => {
    if (visible) {
      sheetRef.current?.snapToIndex(1); // Open to 50% by default
    } else {
      sheetRef.current?.close();
      Keyboard.dismiss();
    }
  }, [visible]);

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.handle} />
    </View>
  );

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleSheetChange}
      handleComponent={renderHeader}
      enablePanDownToClose={true}
      enableOverDrag={false}
    >
        {children}
    </BottomSheet>
  );
};


export default BottomSheetModal;
