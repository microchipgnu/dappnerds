import React, { useState, useEffect } from "react";
import { Widget, addResponseMessage, addUserMessage } from "react-chat-widget";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "@ethersproject/contracts";
import { store } from "react-notifications-component";

import ChatABI from "../../abi/chat.json";

const chatAddress = "0xe8f929dc1ee511e8c20224600dc14d7f06df2ccc";

const Chat = ({ title, subtitle }) => {
  const { library, account } = useWeb3React();

  const contract = new Contract(chatAddress, ChatABI, library.getSigner());

  useEffect(() => {
    contract.getMessageCountForRoom("general").then((count) => {
      for (let i = 0, p = Promise.resolve(); i < count; i++) {
        p = p.then((_) =>
          contract.getMessageByIndexForRoom("general", i).then((res) => {
            console.log(res);
            account.toLowerCase() === res[1].toLowerCase()
              ? addUserMessage(`${res[0]}`)
              : addResponseMessage(`${res[0]}`);
          })
        );
      }
    });

    const newMessageEvent = contract.filters.NewMessage();
    library.on(newMessageEvent, (tx) => {
      store.addNotification({
        title: "Message received",
        message: "dsfsd",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
    });

    return () => {
      library.removeAllListeners(newMessageEvent);
    };
  }, []);

  return (
    <Widget
      showTimeStamp={false}
      title={title}
      subtitle={subtitle}
      handleNewUserMessage={(msg) => contract.sendMessage(msg, "general")}
    />
  );
};

export default Chat;
