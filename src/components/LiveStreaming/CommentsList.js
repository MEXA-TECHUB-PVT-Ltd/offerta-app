import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { Avatar } from "react-native-paper";
import { appImages } from "../../constant/images";
import { fontFamily } from "../../constant/fonts";

const CommentsList = ({ data }) => {
  const ref_CommentFlatList = useRef(null);
  return (
    <View>
      <FlatList
        fadingEdgeLength={100}
        ref={ref_CommentFlatList}
        onContentSizeChange={() =>
          ref_CommentFlatList.current?.scrollToEnd({
            animated: true,
          })
        }
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                marginBottom: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Avatar.Image source={appImages.user2} size={30} />
              <View
                style={{
                  justifyContent: "center",
                  marginHorizontal: 10,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontFamily: fontFamily.Poppins_Medium,
                    fontSize: 12,
                  }}
                >
                  {item?.user_name}
                </Text>
                <Text
                  style={{
                    color: "white",
                    fontFamily: fontFamily.Poppins_Regular,
                    fontSize: 10,
                  }}
                >
                  {item?.comment}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default CommentsList;

const styles = StyleSheet.create({});
