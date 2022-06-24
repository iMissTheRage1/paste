import * as React from 'react';
import {CustomizationProvider} from '@twilio-paste/customization';
import {Avatar} from '@twilio-paste/avatar';
import {Box} from '@twilio-paste/box';
import type {StoryFn} from '@storybook/react';
import {ChatMessage, ChatBubble, ChatMessageMeta, ChatMessageMetaItem} from '../src';

// eslint-disable-next-line import/no-default-export
export default {
  title: 'Components/ChatLog/Customization',
};

export const CustomizedMessages: StoryFn = () => (
  <CustomizationProvider
    baseTheme="default"
    elements={{
      CHAT_MESSAGE: {
        marginBottom: 'space100',
        variants: {
          inbound: {marginRight: 'space100'},
          outbound: {marginLeft: 'space100'},
        },
      },
      CHAT_BUBBLE: {
        color: 'colorTextInverse',
        variants: {
          inbound: {backgroundColor: 'colorBackgroundPrimary'},
          outbound: {backgroundColor: 'colorBackgroundPrimaryDarker'},
        },
      },
      CHAT_MESSAGE_META: {
        columnGap: 'space50',
        variants: {
          inbound: {justifyContent: 'flex-start'},
          outbound: {justifyContent: 'flex-end'},
        },
      },
      CHAT_MESSAGE_META_ITEM: {
        color: 'colorText',
        columnGap: 'space0',
      },
    }}
  >
    <Box as="ul" width="100%">
      <ChatMessage variant="inbound">
        <ChatBubble>test</ChatBubble>
        <ChatMessageMeta aria-label="said by Gibby Radki 4 minutes ago">
          <ChatMessageMetaItem>
            <ChatMessageMetaItem>
              <Avatar name="Gibby Radki" size="sizeIcon20" />
              Gibby Radki
            </ChatMessageMetaItem>
          </ChatMessageMetaItem>
          <ChatMessageMetaItem>4 minutes ago</ChatMessageMetaItem>
        </ChatMessageMeta>
      </ChatMessage>
      <ChatMessage variant="outbound">
        <ChatBubble>test</ChatBubble>
        <ChatMessageMeta aria-label="said by you 2 minutes ago (read)">
          <ChatMessageMetaItem>2 minutes ago</ChatMessageMetaItem>
          <ChatMessageMetaItem>Read</ChatMessageMetaItem>
        </ChatMessageMeta>
      </ChatMessage>
    </Box>
  </CustomizationProvider>
);
