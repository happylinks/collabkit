import { ReactNode, useEffect, useRef, useState } from 'react';
import { styled } from './UIKit';
import CommentAnything from './CommentAnything.svg';
import AnyApp from './AnyApp.svg';
import Realtime from './Realtime.svg';
import Email from './Email.svg';
import ChevronDown from './ChevronDown.svg';
import RocketLaunchIcon from './RocketLaunch.svg';
import HandPointingIcon from './HandPointing.svg';
import Cursor from './Cursor.svg';
import Logo from './Logo.svg';
import ycLogoSvg from './yc-logo.svg';
import checkmarkSvg from './checkmark.svg';
import { Demo } from './Demo';
import { Demo1 } from './Demo1';
import { Demo2 } from './Demo2';
import { DiscordLogo } from 'phosphor-react';

const Grid = styled('div', {
  display: 'grid',
});

const VStack = styled('div', {
  display: 'flex',
  flexDirection: 'column',
});

const HStack = styled('div', {
  display: 'flex',
  flexDirection: 'row',
});

const Text = styled('p', {
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '1.25rem',
  lineHeight: '140%',
  letterSpacing: '-0.03em,',
  zIndex: 1,
});

const Title = styled('h1', {
  fontFamily: 'Space Grotesk',
  fontFeatureSettings: 'ss04',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '5.5rem',
  lineHeight: '95%',
  textAlign: 'center',
  letterSpacing: '-0.05em',
  color: '#222222',
  margin: '4rem 0 2rem',
  zIndex: 1,

  '@bp1': { marginTop: 0, maxWidth: '90vw', minWidth: '90vw', fontSize: '4rem' },
  '@bp2': { maxWidth: 'unset', minWidth: 'unset', fontSize: '7rem' },
});

const Em = styled('em', {
  // fontFamily: 'Source Serif Pro',
  zIndex: 1,
  fontStyle: 'normal',
});

const Subtitle = styled('h2', {
  fontFamily: 'Space Grotesk',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '2rem',
  lineHeight: '116%',
  letterSpacing: '-0.05em',
  zIndex: 1,
});

const Button = styled('button', {
  fontFamily: 'Inter',
  padding: '1rem 2rem',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '1.25rem',
  lineHeight: '100%',
  textAlign: 'center',
  letterSpacing: '-0.03em',
  color: '#FFFFFF',
  background: '#222222',
  borderRadius: 100,
  gap: '10px',
  border: 'none',
  zIndex: 1,
  cursor: 'pointer',
  '&:hover': {
    background: 'black',
  },
});

const Section = styled('section', {
  minHeight: '100vh',
  position: 'relative',
  display: 'flex',
  width: '100vw',
  overflow: 'hidden',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const Header = styled('header', {
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'stretch',
  flex: 1,
  width: '90vw',
  padding: '0 5vw',
  position: 'fixed',
  zIndex: 2,
  maxWidth: '1352px',

  // '@bp1': { marginTop: '1rem', flexDirection: 'column', alignItems: 'flex-start' },
});

const Link = styled('a', {
  fontSize: '1.25rem',
  textDecoration: 'none',
  color: 'black',
  '&:hover': {
    textDecoration: 'underline',
  },
});

const Circle = styled('div', {
  aspectRatio: 1,
  minWidth: '40rem',
  maxWidth: '40rem',
  borderRadius: '50%',
  background: '#FFEC6B',
  zIndex: 0,

  '@bp1': { maxWidth: '90vw', minWidth: '90vw', width: '90vw' },
  '@bp2': { minWidth: '40rem', maxWidth: '50rem', width: 'unset' },

  variants: {
    color: {
      yellow: {
        background: '#FFEC6B',
      },
      purple: {
        background: '#905EC9',
      },
      sky: {
        background: '#92E4FD',
      },
      pink: {
        background: '#D556A1',
      },
      amber: {
        background: '#FBC858',
      },
      indigo: {
        background: '#4D71DF',
      },
    },
  },
});

const Article = styled('article', {
  display: 'grid',
  alignItems: 'center',
  justifyContent: 'center',
  gridTemplateColumns: '20rem 27.5rem',
  columnGap: '8rem',
  border: '2px solid #222222',
  borderRadius: '1.25rem',
  maxWidth: '36rem',

  img: {
    maxWidth: '100%',
  },

  '@bp1': {
    padding: '0rem',
    gridTemplateColumns: '1fr',
  },
  '@bp2': {
    padding: '0rem',
    gridTemplateColumns: '1fr',
  },
});

const BoostActivationLayout = styled('div', {
  display: 'grid',
  justifyContent: 'center',
  gridTemplateColumns: 'minmax(20rem, 60rem) 20rem',
  columnGap: '4rem',
  width: 'calc(100vw - 4rem)',

  '@bp1': {
    gridTemplateColumns: '1fr',
    rowGap: '4rem',
  },
  '@bp2': {
    gridTemplateColumns: 'minmax(20rem, 60rem) 20rem',
  },
});

const FeatureGrid = styled(Grid, {
  gridTemplateColumns: '1fr 1fr',
  marginTop: '4rem',

  '@bp1': {
    padding: '2rem 2rem 8rem',
    gridTemplateColumns: '1fr',
    gap: '2rem',
  },

  '@bp2': {
    padding: '4rem 4rem 8rem',
    gridTemplateColumns: '1fr 1fr',
    width: 'unset',
    gap: '4rem',
  },
});

function RequestDemoButton() {
  return (
    <Button
      onClick={() =>
        (window.location.href = 'https://calendly.com/namit-chadha/30min?month=2022-07')
      }
    >
      Request a demo
    </Button>
  );
}

function StickyHeader(props: { invertFilter?: number }) {
  return (
    <Header style={{ marginTop: '1rem', filter: `invert(${props.invertFilter ?? 0})` }}>
      <div style={{ display: 'flex', flex: 1 }}>
        <img
          onClick={() =>
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth',
            })
          }
          src={Logo}
          style={{
            height: '1.5rem',
            position: 'relative',
            cursor: 'pointer',
            top: window.innerWidth > 640 ? '0.15rem' : 0,
          }}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '4rem' }}>
        {window.innerWidth > 640 ? (
          <Text>
            <Link
              style={{ cursor: 'pointer' }}
              onClick={() =>
                document
                  .getElementsByClassName('FooterLinks')[0]
                  .scrollIntoView({ behavior: 'smooth' })
              }
            >
              Contact us
            </Link>
          </Text>
        ) : null}
        <div style={{ position: 'relative', top: window.innerWidth > 640 ? '0.5rem' : 0 }}>
          <RequestDemoButton />
        </div>
      </div>
    </Header>
  );
}

const BoostActivation = (
  <div
    id="boost-activation"
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '0',
      alignItems: 'center',
      justifyContent: 'center',
      ...(window.innerWidth > 640
        ? { textAlign: 'center', padding: '4rem 0', width: '100vw' }
        : { textAlign: 'left', padding: '4rem 2rem', width: 'calc(100vw - 4rem)' }),
    }}
  >
    <img style={{ width: '6rem', marginBottom: '2.5rem' }} src={RocketLaunchIcon} />
    <Subtitle
      style={{ fontSize: '3rem', lineHeight: '3.5rem', marginBottom: '2rem', marginTop: 0 }}
    >
      Boost activation and retention
    </Subtitle>
    <Text
      style={{
        maxWidth: '40rem',
        ...(window.innerWidth > 640 ? { textAlign: 'center' } : { textAlign: 'left' }),
        marginTop: 0,
      }}
    >
      Give contextual feedback, onboard coworkers or even leave tips on how to use your product all
      in real time
    </Text>
  </div>
);

const TryItOut = (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '0',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '4rem 0',
    }}
  >
    <img style={{ width: '6rem', marginBottom: '2.5rem' }} src={HandPointingIcon} />
    <Subtitle
      style={{ fontSize: '3rem', lineHeight: '3.5rem', marginBottom: '2rem', marginTop: 0 }}
    >
      Try it out
    </Subtitle>
    <Text style={{ maxWidth: '50rem', textAlign: 'center', marginTop: 0 }}>
      Click anywhere to leave a comment or reply to an existing one
    </Text>
  </div>
);

const Hero = (
  <Section
    style={{
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <Grid
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        gridTemplateColumns: '1fr',
        columnGap: '0',
      }}
    >
      {/* <Circle color="sky" style={{ transform: 'translateX(-33%)' }} /> */}
      <Circle
        color="yellow"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <VStack style={{ margin: '3rem -6rem 0' }}>
          <Title>
            Add commenting to <br />
            <Em>your</Em> product
          </Title>
          <Text style={{ textAlign: 'center', fontSize: '1.5rem', letterSpacing: '-0.03em' }}>
            It only takes minutes, with our
            <br /> customisable React SDK.
          </Text>
        </VStack>
        {window.innerWidth > 640 ? (
          <img style={{ position: 'absolute', bottom: 0, right: 0 }} src={Cursor} />
        ) : null}
      </Circle>
      {/* <Circle color="purple" style={{ transform: 'translateX(33%)' }} /> */}
    </Grid>
    <img
      role={'button'}
      onClick={() =>
        document.querySelector('#boost-activation')?.scrollIntoView({ behavior: 'smooth' })
      }
      src={ChevronDown}
      style={{
        position: 'absolute',
        left: '50%',
        marginLeft: -14,
        bottom: 'calc((100vh - 40rem)/4)',
      }}
    />
  </Section>
);

const DemoContainer = styled('div', {
  maxWidth: '1352px',
  width: '90vw',
  maxHeight: '760px',
  marginTop: '8.75rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  '@bp1': {
    marginTop: '3rem',
    marginBottom: 0,
  },
  '@bp2': {
    marginTop: '8.75rem',
  },
});

// const ContextualConversations = (
//   <Section
//     style={{
//       position: 'relative',
//       overflow: 'hidden',
//       minHeight: '55rem',
//     }}
//   >
//     <Grid
//       style={{
//         alignItems: 'center',
//         justifyContent: 'center',
//         gridTemplateColumns: 'repeat(3, 1fr)',
//         columnGap: '0',
//       }}
//     >
//       <Circle color="pink" style={{ transform: 'translateX(-33%)' }} />
//       <Circle
//         color="amber"
//         style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
//       >
//         <VStack style={{ margin: '0 -5rem' }}>
//           <Title>
//             Have conversations with <Em>context</Em>
//           </Title>
//           <Text style={{ textAlign: 'center' }}>
//             CollabKit works just like commenting in
//             <br /> Figma, Google Docs and Notion.
//           </Text>
//         </VStack>
//       </Circle>
//       <Circle color="indigo" style={{ transform: 'translateX(33%)' }} />
//     </Grid>
//   </Section>
// );

const PlanGrid = styled(Grid, {
  gridTemplateColumns: '1fr 1fr 1fr',
  columnGap: '3rem',
  padding: '0 4rem',

  '@bp1': { gridTemplateColumns: '1fr', rowGap: '2rem', width: 'calc(100% - 4rem)' },
  '@bp2': { gridTemplateColumns: '1fr 1fr 1fr', width: 'calc(100% - 12rem)', maxWidth: '1352px' },
});

const Plan = styled(VStack, {
  border: '2px solid #222222',
  borderRadius: 24,
  textAlign: 'initial',
  '@bp1': { padding: '2.5rem 2rem' },
  '@bp2': { padding: '2.5rem 3.5rem 2.5rem' },
});

const PlanTitle = styled('h3', {
  fontFamily: 'Space Grotesk',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '2rem',
  marginTop: 0,
  marginBottom: '1.25rem',
  lineHeight: '128.125%',
  letterSpacing: '-0.05em',
  color: '#222222',
});

const PlanPrice = styled('span', {
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '3rem',
  lineHeight: '120%',
  letterSpacing: '-0.03em',
  color: '#222222',
});

const Small = styled('span', {
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '1rem',
  lineHeight: '118.75%',
  whiteSpace: 'nowrap',
  letterSpacing: '0',
});

const PlanFeatures = styled('ul', {
  paddingBlock: 0,
  paddingInline: 0,
  marginBottom: '2.5rem',
  listStyleType: 'none',
  flex: 1,
});

const PlanFeatureItem = styled('li', {
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '1rem',
  lineHeight: '250%',
  color: '#222222',
  display: 'flex',
  flexDirection: 'row',
});

const PlanFeatureContent = styled('div', {
  marginLeft: '0.625rem',
});

const PlanPricingSmall = styled('div', {
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: 12,
  lineHeight: '15px',
  marginTop: '0rem',
  marginBottom: '1.5rem',
});

const JustAddInnerSection = styled(VStack, {
  textAlign: 'center',
  maxWidth: '58rem',
  width: '90vw',
  justifyContent: 'center',
  alignItems: 'center',

  '@bp1': {
    marginTop: '4rem',
  },
  '@bp2': {
    marginTop: '7rem',
  },
});

const FooterLink = styled('a', {
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '1rem',
  lineHeight: '120%',
  /* or 19px */

  textAlign: 'center',
  letterSpacing: '-0.03em',

  /* Grey 60 */

  color: '#999999',
  textDecoration: 'none',
});

export const DemoImageMobileFallback = styled('img', {
  width: '90vw',
  maxWidth: '90vw',
});

function PlanFeature({ children }: { children: ReactNode }) {
  return (
    <PlanFeatureItem>
      <img src={checkmarkSvg} style={{ width: '1rem', height: '1rem', marginTop: '0.75rem' }} />
      <PlanFeatureContent>{children}</PlanFeatureContent>
    </PlanFeatureItem>
  );
}

export function Home() {
  const [invertFilter, setInvertFilter] = useState(0);
  const examplesRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const listener = () => {
      if (examplesRef.current) {
        const rect = examplesRef.current.getBoundingClientRect();
        if (rect.top < 0 && rect.top > -rect.height) {
          setInvertFilter(1);
        } else {
          setInvertFilter(0);
        }
      }
    };
    window.addEventListener('scroll', listener);
    return () => window.removeEventListener('scroll', listener);
  }, []);
  return (
    <VStack style={{ alignItems: 'center' }}>
      <StickyHeader invertFilter={invertFilter} />
      {Hero}
      {BoostActivation}
      {window.innerWidth > 640 ? TryItOut : null}
      {/* {ContextualConversations} */}
      <Demo />
      <Section
        style={{
          marginTop: '6rem',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#EDF5F7',
        }}
      >
        <VStack
          style={{
            marginTop: '10rem',
            maxWidth: '50rem',
            width: '90vw',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Title style={{ textAlign: 'center', marginBottom: '3rem' }}>
            Conversations with context
          </Title>
          <Text>CollabKit works just like commenting in Figma, Google Docs &amp; Notion.</Text>
        </VStack>
        <FeatureGrid>
          <Article>
            <div
              style={{
                width: '100%',
                marginTop: '4rem',
                marginBottom: '2.5rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img
                src={CommentAnything}
                style={{
                  width: '100%',
                  ...(window.innerWidth > 640
                    ? { maxWidth: 'calc(100% - 8rem)' }
                    : { maxWidth: 'calc(100% - 0rem)' }),
                }}
              />
            </div>
            <VStack
              style={
                window.innerWidth > 640 ? { padding: '0 4rem 2rem' } : { padding: '0 2rem 2rem' }
              }
            >
              <Subtitle>Comment on anything</Subtitle>
              <Text>
                Have discussions in context. Conversations about that sale, product, invoice or
                customer all happen in the same place.
              </Text>
            </VStack>
          </Article>
          <Article>
            <div
              style={{
                width: '100%',
                marginTop: '4rem',
                marginBottom: '2.5rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img
                src={AnyApp}
                style={{
                  width: '100%',
                  ...(window.innerWidth > 640
                    ? { maxWidth: 'calc(100% - 8rem)' }
                    : { maxWidth: 'calc(100% - 0rem)' }),
                }}
              />
            </div>
            <VStack
              style={
                window.innerWidth > 640 ? { padding: '0 4rem 2rem' } : { padding: '0 2rem 2rem' }
              }
            >
              {' '}
              <Subtitle>In any type of app</Subtitle>
              <Text>
                CollabKit Works across all kinds of interfaces; CRMs, documents, analytics
                dashboards, calendars and more...
              </Text>
            </VStack>
          </Article>
          <Article>
            <div
              style={{
                width: '100%',
                marginTop: '4rem',
                marginBottom: '2.5rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img
                src={Realtime}
                style={{
                  width: '100%',
                  ...(window.innerWidth > 640
                    ? { maxWidth: 'calc(100% - 8rem)' }
                    : { maxWidth: 'calc(100% - 0rem)' }),
                }}
              />
            </div>
            <VStack
              style={
                window.innerWidth > 640 ? { padding: '0 4rem 2rem' } : { padding: '0 2rem 2rem' }
              }
            >
              {' '}
              <Subtitle>All in real time</Subtitle>
              <Text>
                See who’s online, who’s typing and keep the conversation going without ever leaving
                your product.
              </Text>
            </VStack>
          </Article>
          <Article>
            <div
              style={{
                width: '100%',
                marginTop: '4rem',
                marginBottom: '2.5rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img
                src={Email}
                style={{
                  width: '100%',
                  ...(window.innerWidth > 640
                    ? { maxWidth: 'calc(100% - 8rem)' }
                    : { maxWidth: 'calc(100% - 0rem)' }),
                }}
              />
            </div>
            <VStack
              style={
                window.innerWidth > 640 ? { padding: '0 4rem 2rem' } : { padding: '0 2rem 2rem' }
              }
            >
              {' '}
              <Subtitle>Get notified by email</Subtitle>
              <Text>
                New comments are sent straight to your inbox. Reply directly via email or click
                through to the comment thread.
              </Text>
            </VStack>
          </Article>
        </FeatureGrid>
      </Section>
      <Section
        ref={examplesRef}
        style={{
          background: '#35284A',
          color: 'white',
        }}
      >
        <JustAddInnerSection style={{ marginTop: '12rem' }}>
          <Title style={{ color: 'white', marginBottom: '3.75rem' }}>
            Just add <br />
            {'<CollabKit />'}
          </Title>
          <Text
            style={{
              marginBottom: 0,
              marginTop: 0,
              ...(window.innerWidth > 640 ? {} : { padding: '0 2rem', textAlign: 'left' }),
            }}
          >
            {`To enable commenting throughout your app, wrap it in a `}
            <span style={{ color: '#E25982' }}>
              {`<Commentable />`}
              <br />
            </span>
            {`  and add a `}
            <span style={{ color: '#C9EB59' }}>{`<CommentButton />`}</span>
            {`. Optionally, mark things with a `}
            <span style={{ color: '#92E4FD' }}>{`data-commentable-id`}</span>
            {` attribute to ensure a canonical thread is created.`}
          </Text>
        </JustAddInnerSection>
        <DemoContainer>
          <Demo1 />
        </DemoContainer>
        <JustAddInnerSection>
          <Subtitle style={{ fontSize: '3rem', color: 'white', marginBottom: '3.75rem' }}>
            Or add a {'<Thread />'}
          </Subtitle>
          <Text
            style={{
              marginBottom: 0,
              marginTop: 0,
              ...(window.innerWidth > 640 ? {} : { padding: '0 2rem', textAlign: 'left' }),
            }}
          >
            {`Our flexible thread component can be include inline in your app. Great for detail views where your want to talk about a customer, product, invoice or sale.`}
          </Text>
        </JustAddInnerSection>
        <DemoContainer style={{ marginBottom: '10rem' }}>
          <Demo2 />
        </DemoContainer>
      </Section>
      <Section
        style={{
          background: '#FFEC6B',
          textAlign: 'center',
          paddingTop: '10rem',
          minHeight: '80vh',
        }}
      >
        <VStack>
          <Title
            style={{
              marginTop: 0,
              marginBottom: '3.75rem',
            }}
          >
            Pricing
          </Title>
          <Text
            style={{
              marginTop: 0,
              marginBottom: '7.5rem',
            }}
          >
            Choose a package that suits you.
          </Text>
        </VStack>
        <PlanGrid>
          <Plan>
            <PlanTitle>Starter</PlanTitle>
            <PlanPrice>Free</PlanPrice>
            <PlanFeatures>
              <PlanFeature>100 monthly active users</PlanFeature>
              <PlanFeature>Commenting</PlanFeature>
              <PlanFeature>Presence</PlanFeature>
            </PlanFeatures>
            <RequestDemoButton />
          </Plan>
          <Plan>
            <PlanTitle>Pro</PlanTitle>
            <PlanPrice>
              $400 <Small>Per month*</Small>
            </PlanPrice>
            <PlanFeatures>
              <PlanFeature>Up to 5,000 monthly active users</PlanFeature>
              <PlanFeature>Commenting</PlanFeature>
              <PlanFeature>Presence</PlanFeature>
              <PlanFeature>Analytics dashboard</PlanFeature>
              <PlanFeature>Customisability</PlanFeature>
              <PlanFeature>Slack &amp; Discord support</PlanFeature>
            </PlanFeatures>
            <PlanPricingSmall>
              *Up to 5000 monthly active users, then $1 per 100 monthly active users thereafter.
            </PlanPricingSmall>
            <RequestDemoButton />
          </Plan>
          <Plan>
            <PlanTitle>Enterprise</PlanTitle>
            <PlanPrice>Custom</PlanPrice>
            <PlanFeatures>
              <PlanFeature>Unlimited monthly active users</PlanFeature>
              <PlanFeature>Commenting</PlanFeature>
              <PlanFeature>Presence</PlanFeature>
              <PlanFeature>Analytics dashboard</PlanFeature>
              <PlanFeature>Customisability</PlanFeature>
              <PlanFeature>Slack &amp; Discord support</PlanFeature>
              <PlanFeature>SLA</PlanFeature>
              <PlanFeature>API</PlanFeature>
            </PlanFeatures>
            <RequestDemoButton />
          </Plan>
        </PlanGrid>
      </Section>
      <Section
        style={{
          paddingTop: '15rem',
          paddingBottom: '5rem',
          minHeight: '40vh',
          background: '#222222',
        }}
      >
        <Title style={{ color: 'white', marginBottom: '3.75rem' }}>Contact Us</Title>
        <Text
          style={{
            color: 'white',
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: '1.25rem',
            textAlign: 'center',
            letterSpacing: '-0.03em',
            margin: 0,
            marginBottom: '4rem',
          }}
        >
          Any questions? Email us or join our Discord.
        </Text>
        <HStack style={{ gap: '2rem', margin: 0 }}>
          <a
            href="mailto:info@collabkit.dev"
            style={{
              border: '1px solid white',
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: '1.25rem',
              lineHeight: '110%',
              padding: '1.25rem 2rem',
              width: '11rem',
              textAlign: 'center',
              borderRadius: '100px',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            info@collabkit.dev
          </a>
          <a
            href="https://discord.gg/UCA4CbZad4"
            style={{
              border: '1px solid white',
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: '1.25rem',
              lineHeight: '110%',
              padding: '1.25rem 2rem',
              width: '11rem',
              textAlign: 'center',
              borderRadius: '100px',
              color: 'white',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
            }}
          >
            <DiscordLogo color="white" weight={'fill'} size={20} />
            Discord
          </a>
        </HStack>
        <HStack
          style={{
            marginTop: '10rem',
            marginBottom: '0rem',
            alignItems: 'center',
            gap: '0.625rem',
          }}
        >
          <img src={ycLogoSvg} style={{ width: '2rem', height: '2rem' }} />
          <Small style={{ color: 'white' }}>Backed by Y Combinator</Small>
        </HStack>
        <HStack className="FooterLinks" style={{ gap: '1rem', marginTop: '2rem' }}>
          <FooterLink>Teamspace Inc. 2022</FooterLink>
          <FooterLink target="_blank" href="https://www.iubenda.com/privacy-policy/17041190">
            Privacy
          </FooterLink>
          <FooterLink
            target="_blank"
            href="https://www.iubenda.com/privacy-policy/17041190/cookie-policy"
          >
            Cookies
          </FooterLink>
          <FooterLink target="_blank" href="https://www.iubenda.com/terms-and-conditions/17041190">
            Terms &amp; Conditions
          </FooterLink>
        </HStack>
      </Section>
    </VStack>
  );
}
