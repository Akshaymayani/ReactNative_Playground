import * as DocumentPicker from 'react-native-document-picker';

import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useState} from 'react';

import ChatFileTransfer from './TransferChatFile';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import InChatFileTransfer from './TransferChatFile';
import InChatViewFile from './ChatViewFIle';

const ChatLayout = () => {



  const [messages, setMessages] = useState([
    {
      _id: 1,
      text: 'Welcome to My ChatApp!',
      createdAt: new Date(),
      user: {
        _id: 1,
        name: 'UserChar',
        avatar: '',
      },
      image: '',
      file: '',
    },
  ]);
  const [isAttachImage, setIsAttachImage] = useState(false);
const [isAttachFile, setIsAttachFile] = useState(false);
const [imagePath, setImagePath] = useState('');
const [filePath, setFilePath] = useState('');
const [fileVisible, setFileVisible] = useState(false);



const onSend = useCallback((messages:any = []) => {
  const [messageToSend]:any = messages;
  if (isAttachImage) {
    const newMessage:any = {
      _id: messages[0]._id + 1,
      text: messageToSend.text,
      createdAt: new Date(),
      user: {
        _id: 2,
        avatar: '',
      },
      image: imagePath,
      file: {
        url: '',
      },
    };
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessage),
    );
    setImagePath('');
    setIsAttachImage(false);
  } else if (isAttachFile) {
    const newMessage:any = {
      _id: messages[0]._id + 1,
      text: messageToSend.text,
      createdAt: new Date(),
      user: {
        _id: 2,
        avatar: '',
      },
      image: '',
      file: {
        url: filePath,
      },
    };
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessage),
    );
    setFilePath('');
    setIsAttachFile(false);
  } else {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }
},
[filePath, imagePath, isAttachFile, isAttachImage],
);

const _pickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        copyTo: 'documentDirectory',
        mode: 'import',
        allowMultiSelection: true,
      });
      const fileUri = result[0].fileCopyUri;
      if (!fileUri) {
        console.log('File URI is undefined or null');
        return;
      }
      if (fileUri.indexOf('.png') !== -1 || fileUri.indexOf('.jpg') !== -1) {
        setImagePath(fileUri);
        setIsAttachImage(true);
      } else {
        setFilePath(fileUri);
        setIsAttachFile(true);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled file picker');
      } else {
        console.log('DocumentPicker err => ', err);
        throw err;
      }
    }
  };


  const renderChatFooter = useCallback(() => {
    if (imagePath) {
      return (
        <View style={styles.chatFooter}>
          <Image source={{uri: imagePath}} style={{height: 75, width: 75}} />
          <TouchableOpacity
            onPress={() => setImagePath('')}
            style={styles.buttonFooterChatImg}
          >
            <Text style={styles.textFooterChat}>X</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (filePath) {
      return (
        <View style={styles.chatFooter}>
          <ChatFileTransfer
            filePath={filePath}
          />
          <TouchableOpacity
            onPress={() => setFilePath('')}
            style={styles.buttonFooterChat}
          >
            <Text style={styles.textFooterChat}>X</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  }, [filePath, imagePath]);


const renderSend = (props:any) => {
    return (
      <View style={{flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>
        <TouchableOpacity onPress={_pickDocument}
        >
        <FontAwesome
          name="paperclip"
          style={{
            // marginBottom: 10,
            marginRight: 15,
            transform: [{rotateY: '180deg'}],
          }}
          size={25}
          color="#2571bd"
        />
        </TouchableOpacity>
        <Send {...props}>
          <View style={styles.sendContainer}>
        <FontAwesome
          name="send"
          style={{marginBottom: 10, marginRight: 10}}
          size={25}
          color="#0342e2"
        />
          </View>
        </Send>
      </View>
    );
  };

  const renderBubble = (props:any) => {
    const {currentMessage} = props;
    if (currentMessage.file && currentMessage.file.url) {
      return (
        <TouchableOpacity
        style={{
          ...styles.fileContainer,
          backgroundColor: props.currentMessage.user._id === 2 ? '#2e64e5' : '#efefef',
          borderBottomLeftRadius: props.currentMessage.user._id === 2 ? 15 : 5,
          borderBottomRightRadius: props.currentMessage.user._id === 2 ? 5 : 15,
        }}
        onPress={() => setFileVisible(true)}
        >
          <InChatFileTransfer
            style={{marginTop: -10}}
            filePath={currentMessage.file.url}
          />
          <InChatViewFile
              props={props}
              visible={fileVisible}
              onClose={() => setFileVisible(false)}
            />
          <View style={{flexDirection: 'column'}}>
            <Text style={{
                  ...styles.fileText,
                  color: currentMessage.user._id === 2 ? 'white' : 'black',
                }} >
              {currentMessage.text}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{
          right: {
            color: '#efefef',
          },
        }}
      />
    );
  };

const scrollToBottomComponent = () => {
  return <FontAwesome name="angle-double-down" size={22} color="#333" />;
};

  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>
      {/* <NavBar /> */}
      <GiftedChat
        messages={messages}
        //showAvatarForEveryMessage={true}
        //showUserAvatar={true}
        onSend={messages => onSend(messages)}
        user={{
          _id: 2,
        }}
        renderBubble={renderBubble}
        alwaysShowSend
        renderSend={renderSend}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
        renderChatFooter={renderChatFooter}
      />
    </View>
   </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sendContainer:{

  },
  chatFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  chatFooterImage: {
    height: 75,
    width: 75,
    borderRadius: 8,
  },
  fileFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonFooterChatImg: {
    backgroundColor: '#ff4d4d',
    width: 25,
    height: 25,
    borderRadius: 12.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  buttonFooterChat: {
    backgroundColor: '#ff4d4d',
    width: 25,
    height: 25,
    borderRadius: 12.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  textFooterChat: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  //bubble file styles
  fileContainer: {
    maxWidth: '70%',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  fileText: {
    maxWidth: '80%', // Limit the width of the text
    fontSize: 14, // Font size for the message text
    lineHeight: 18, // Line height for better readability
    flexWrap: 'wrap', // Wrap text if it overflows
  },
});

export default ChatLayout;
