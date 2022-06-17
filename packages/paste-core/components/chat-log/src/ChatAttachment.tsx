import * as React from 'react';
import * as PropTypes from 'prop-types';
import {Anchor} from '@twilio-paste/anchor';
import {Button} from '@twilio-paste/button';
import {Box} from '@twilio-paste/box';
import {CloseIcon} from '@twilio-paste/icons/esm/CloseIcon';
import {MediaObject, MediaFigure, MediaBody} from '@twilio-paste/media-object';
import {Text} from '@twilio-paste/text';
import {Truncate} from '@twilio-paste/truncate';

import type {
  ChatAttachmentProps,
  ChatAttachmentContainerProps,
  ChatAttachmentLinkProps,
  ChatAttachmentDescriptionProps,
} from './types';

const ChatAttachmentLink = React.forwardRef<HTMLElement, ChatAttachmentLinkProps>(
  ({children, href, element = 'CHAT_ATTACHMENT_LINK'}) => {
    return (
      <Anchor href={href} element={element}>
        <Truncate title={children}>{children}</Truncate>
      </Anchor>
    );
  }
);

ChatAttachmentLink.displayName = 'ChatAttachmentLink';

const ChatAttachmentDescription = React.forwardRef<HTMLElement, ChatAttachmentDescriptionProps>(
  ({children, element = 'CHAT_ATTACHMENT_DESCRIPTION'}) => {
    return (
      <Text element={element} as="div" fontSize="fontSize20" color="colorTextWeaker" lineHeight="lineHeight10">
        {children}
      </Text>
    );
  }
);

ChatAttachmentDescription.displayName = 'ChatAttachmentDescription';

const ChatAttachment = React.forwardRef<HTMLDivElement, ChatAttachmentProps>(
  ({children, element = 'CHAT_ATTACHMENT', attachmentIcon: AttachmentIcon}) => {
    return (
      <MediaObject as="div" verticalAlign="center" element={element}>
        <MediaFigure as="div" spacing="space40">
          <AttachmentIcon decorative />
        </MediaFigure>
        <MediaBody as="div">{children}</MediaBody>
      </MediaObject>
    );
  }
);

ChatAttachment.displayName = 'ChatAttachment';

ChatAttachment.propTypes = {
  children: PropTypes.node.isRequired,
  element: PropTypes.string,
  attachmentIcon: () => {
    return null;
  },
};

const ChatAttachmentContainer = React.forwardRef<HTMLDivElement, ChatAttachmentContainerProps>(
  ({children, loading, element = 'CHAT_ATTACHMENT_CONTAINER'}) => {
    return (
      <Box
        padding="space30"
        borderStyle="solid"
        borderColor="colorBorderWeaker"
        borderRadius="borderRadius30"
        borderWidth="borderWidth10"
        boxShadow="shadowLow"
        position="relative"
        display="inline-block"
        width="100%"
        element={element}
      >
        {children}
        {!loading && (
          <Box position="absolute" top="space0" right="space0" transform="translate(50%, -50%)">
            {/* round button goes here */}
            <Button variant="secondary" size="icon_small">
              <CloseIcon decorative={false} title="close" />
            </Button>
          </Box>
        )}
      </Box>
    );
  }
);

ChatAttachmentContainer.displayName = 'ChatAttachmentContainer';

ChatAttachmentContainer.propTypes = {
  children: PropTypes.node,
  element: PropTypes.string,
};

export {ChatAttachment, ChatAttachmentContainer, ChatAttachmentLink, ChatAttachmentDescription};
