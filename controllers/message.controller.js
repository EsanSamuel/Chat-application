import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    //calling id as 'receiverId'
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    //searching if there is any arrays in participants
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    //if there is none, create new arrays or sender and receiver's id
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    //create new message
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    //save documents of conversation and message
    await Promise.all([conversation.save(), newMessage.save()]);
    res.status(201).json(newMessage);
  } catch (error) {
    console.log(error);
  }
};

export const getMessage = async (req, res) => {
  try {
    //calling id as 'userchattingId'
    const { id: userchattingId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userchattingId] },
    }).populate("messages");

    res.status(200).json(conversation.messages);
  } catch (error) {
    console.log(error);
  }
};
