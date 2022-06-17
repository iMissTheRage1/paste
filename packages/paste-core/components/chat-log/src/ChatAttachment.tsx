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
  ({children, href, element = 'CHAT_ATTACHMENT_LINK', ...props}, ref) => {
    return (
      <Anchor href={href} ref={ref} element={element} {...props}>
        <Truncate title={children}>{children}</Truncate>
      </Anchor>
    );
  }
);

ChatAttachmentLink.displayName = 'ChatAttachmentLink';

const ChatAttachmentDescription = React.forwardRef<HTMLElement, ChatAttachmentDescriptionProps>(
  ({children, element = 'CHAT_ATTACHMENT_DESCRIPTION', ...props}, ref) => {
    return (
      <Text
        element={element}
        ref={ref}
        as="div"
        fontSize="fontSize20"
        color="colorTextWeaker"
        lineHeight="lineHeight10"
        {...props}
      >
        {children}
      </Text>
    );
  }
);

ChatAttachmentDescription.displayName = 'ChatAttachmentDescription';

const ChatAttachment = React.forwardRef<HTMLDivElement, ChatAttachmentProps>(
  ({children, element = 'CHAT_ATTACHMENT', attachmentIcon: AttachmentIcon, ...props}, ref) => {
    return (
      <MediaObject as="div" ref={ref} verticalAlign="center" element={element} {...props}>
        <MediaFigure element={`${element}_ICON`} as="div" spacing="space40">
          <AttachmentIcon decorative />
        </MediaFigure>
        <MediaBody as="div" element={`${element}_BODY`}>
          {children}
        </MediaBody>
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
  ({children, loading, element = 'CHAT_ATTACHMENT_CONTAINER', ...props}, ref) => {
    return (
      <Box
        ref={ref}
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
        {...props}
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
