<template>
  <div class="chats">
    <CoolLightBox
      :items="formattedChatData.images.value"
      :index="index1"
      :effect="'fade'"
      @close="index1 = null"
    />
    <div
      v-for="(msgGrp, index) in formattedChatData.formattedChatLog"
      :key="msgGrp.senderId+String(index)"
      class="chat"
      :class="{'chat-left': msgGrp.senderId === formattedChatData.contact.id}"
    >
      <div class="chat-avatar">
        <b-avatar
          size="36"
          class="avatar-border-2 box-shadow-1"
          variant="transparent"
          :src="msgGrp.senderId === formattedChatData.contact.id ? formattedChatData.contact.avatar : profileUserAvatar"
        />
      </div>
      <div class="chat-body">
        <div
          v-for="msgData in msgGrp.messages"
          :key="msgData.time"
          class="chat-content"
        >
          <p
            v-if="msgData.msg !== 'Image' "
          >
            {{ msgData.msg }}
          </p>
          <img
            v-if="checkText(msgData.type)"
            alt=""
            :class="msgData.msg !== 'Image'? 'mt-1': null"
            :src="msgData.file_url"
            style="width: 100px; height: 100px;"
            @click="index1=msgData.imageIndex"
          >
          <p
            class="mt-1 message-time d-none"
          >
            {{ dateFormat(msgData.time) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from '@vue/composition-api'
import { BAvatar } from 'bootstrap-vue'
import moment from 'moment'

export default {
  components: {
    BAvatar,
  },
  props: {
    chatData: {
      type: Object,
      required: true,
    },
    profileUserAvatar: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const index1 = ref(null)
    console.log(props.chatData, '=========> props chat data')
    const formattedChatData = computed(() => {
      const contact = {
        id: props.chatData.girl.id,
        avatar: props.chatData.girl.avatar,
      }

      let chatLog = []
      if (props.chatData.messages) {
        chatLog = props.chatData.messages
      }

      const formattedChatLog = []
      let chatMessageSenderId = chatLog[0] ? chatLog[0].senderModel : undefined
      let msgGroup = {
        senderId: chatMessageSenderId,
        messages: [],
      }

      const images = ref([])
      let imageIndex = -1
      chatLog.forEach((msg, index) => {
        console.log('chat data message 1------------>', JSON.parse(JSON.stringify(msg.content)))
        if (msg.tag === 'file') {
          images.value.push(msg.file_url)
          imageIndex += 1
        }
        if (chatMessageSenderId === msg.senderModel) {
          msgGroup.messages.push({
            msg: msg.content,
            time: msg.timestamp,
            type: msg.tag,
            file_url: msg.file_url,
            imageIndex,
          })
        } else {
          chatMessageSenderId = msg.senderModel
          formattedChatLog.push(msgGroup)
          msgGroup = {
            senderId: msg.senderModel,
            messages: [{
              msg: msg.content,
              time: msg.timestamp,
              type: msg.tag,
              file_url: msg.file_url,
              imageIndex,
            }],
          }
        }
        if (index === chatLog.length - 1) formattedChatLog.push(msgGroup)
      })

      return {
        formattedChatLog,
        contact,
        profileUserAvatar: '',
        images,
      }
    })

    return {
      formattedChatData,
      index1,
    }
  },
  methods: {
    checkText(tag) {
      return tag === 'file'
    },
    dateFormat(s) {
      return moment(s).local().format('HH:mm-DD/MM')
    },
  },
}
</script>

<style>

</style>
