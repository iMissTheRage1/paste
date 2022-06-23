import * as React from 'react';
import * as PropTypes from 'prop-types';
import {Anchor} from '@twilio-paste/anchor';
import {Button} from '@twilio-paste/button';
import {Box} from '@twilio-paste/box';
import type {BoxStyleProps} from '@twilio-paste/box';
import {CloseCircleIcon} from '@twilio-paste/icons/esm/CloseCircleIcon';
import {MediaObject, MediaFigure, MediaBody} from '@twilio-paste/media-object';
import {ScreenReaderOnly} from '@twilio-paste/screen-reader-only';
import {Stack} from '@twilio-paste/stack';
import {Text} from '@twilio-paste/text';
import {Truncate} from '@twilio-paste/truncate';

import type {
  ChatAttachmentProps,
  ComposerAttachmentCardProps,
  ChatAttachmentLinkProps,
  ChatAttachmentDescriptionProps,
} from './types';

/*
These style props are specific to our CloseCircleIcon use case in ComposerAttachmentCard.

The close button uses CloseCircleIcon and needs the Box behind it to have these styles
because the inner part of the glyph is transparent (variant="secondary_icon").
When more button variants become available, closeButtonBackgroundStyles should
be reconsidered (and possibly removed).
*/
const closeButtonBackgroundStyles: BoxStyleProps = {
  backgroundColor: 'colorBackgroundBody',
  borderRadius: 'borderRadiusCircle',
  width: '12px',
  height: '12px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

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

ChatAttachmentLink.propTypes = {
  children: PropTypes.string.isRequired,
  element: PropTypes.string,
};

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

ChatAttachmentDescription.propTypes = {
  children: PropTypes.string.isRequired,
  element: PropTypes.string,
};

const ChatAttachment = React.forwardRef<HTMLDivElement, ChatAttachmentProps>(
  ({children, element = 'CHAT_ATTACHMENT', attachmentIcon, ...props}, ref) => {
    return (
      <MediaObject as="div" ref={ref} verticalAlign="center" element={element} {...props}>
        <MediaFigure element={`${element}_ICON`} as="div" spacing="space40">
          {attachmentIcon}
        </MediaFigure>
        <MediaBody as="div" element={`${element}_BODY`}>
          <Stack element={`${element}_STACK`} orientation="vertical" spacing="space10">
            {children}
          </Stack>
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

const ComposerAttachmentCard = React.forwardRef<HTMLDivElement, ComposerAttachmentCardProps>(
  (
    {children, onDismiss, i18nDismissLabel = 'remove attachment', element = 'COMPOSER_ATTACHMENT_CARD', ...props},
    ref
  ) => {
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
        {onDismiss && (
          <Box
            position="absolute"
            top="space0"
            right="space0"
            transform="translate(50%, -50%)"
            {...closeButtonBackgroundStyles}
          >
            <Button
              element={`${element}_REMOVE_ATTACHMENT_BUTTON`}
              variant="secondary_icon"
              size="icon"
              onClick={() => onDismiss()}
            >
              <CloseCircleIcon decorative element={`${element}_CLOSE_ICON`} />
              <ScreenReaderOnly>{i18nDismissLabel}</ScreenReaderOnly>
            </Button>
          </Box>
        )}
      </Box>
    );
  }
);

ComposerAttachmentCard.displayName = 'ComposerAttachmentCard';

ComposerAttachmentCard.propTypes = {
  children: PropTypes.node.isRequired,
  element: PropTypes.string,
};

export {ChatAttachment, ComposerAttachmentCard, ChatAttachmentLink, ChatAttachmentDescription};
