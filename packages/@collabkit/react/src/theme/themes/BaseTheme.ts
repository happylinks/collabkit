import { AvatarBase } from './base/AvatarBase';
import { ButtonBase } from './base/ButtonBase';
import { ColorBase } from './base/ColorBase';
import { CommentBase } from './base/CommentBase';
import { CommentListBase } from './base/CommentListBase';
import { ComposerBase } from './base/ComposerBase';
import { FacepileBase } from './base/FacepileBase';
import { InboxBase } from './base/InboxBase';
import { MentionsBase } from './base/MentionsBase';
import { MenuBase } from './base/MenuBase';
import { NewIndicatorBase } from './base/NewIndicatorBase';
import { ProfileBase } from './base/ProfileBase';
import { PinBase } from './base/PinBase';
import { ScrollbarBase } from './base/ScrollbarBase';
import { ShadowBase } from './base/ShadowBase';
import { SidebarBase } from './base/SidebarBase';
import { SpaceBase } from './base/SpaceBase';
import { TextBase } from './base/TextBase';
import { ThreadBase } from './base/ThreadBase';
import { ZIndexBase } from './base/ZIndexBase';

export const BaseTheme = {
  ...NewIndicatorBase,
  ...ColorBase,
  ...CommentListBase,
  ...TextBase,
  ...SpaceBase,
  ...ButtonBase,
  ...AvatarBase,
  ...CommentBase,
  ...ComposerBase,
  ...FacepileBase,
  ...InboxBase,
  ...MentionsBase,
  ...MenuBase,
  ...PinBase,
  ...ProfileBase,
  ...ScrollbarBase,
  ...ShadowBase,
  ...SidebarBase,
  ...ThreadBase,
  ...ZIndexBase,
};

export const LightTheme = BaseTheme;
