import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import * as CollabKit from '../../../packages/@collabkit/react/src/index';
import { getUserToken } from '@collabkit/node';

export async function getServerSideProps(context: any) {
  console.log('SSR props');
  try {
    const credentials = {
      appId: 'gblfnmjLQwxN0dz9r4mer',
      apiKey: 'ZvvFSLbEUEgE9YF8Fxn65',
      mode: 'SECURED',
      workspaceId: 'default',
      userId: 'alice',
      user: {
        name: 'Alice',
        email: 'alice@example.com',
      },
      workspace: {
        name: 'Default',
      },
    };

    const response = await getUserToken(credentials);
    if (response?.status === 201) {
      return {
        props: {
          ...response.data,
        },
      };
    }
  } catch (e) {
    console.error('Failed to generateToken', e);
  }
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default (props: {
  appId: string;
  userId: string;
  workspaceId: string;
  mode: 'SECURED';
  token: string;
}) => {
  return (
    <CollabKit.Provider
      colorScheme="light"
      appId={props.appId}
      token={props.token}
      theme={{
        radii: { 0: '0.5rem' },
        fontSize: { 0: '12px', 2: '14px', 3: '20px' },
        fontWeights: { 2: 500, 3: 700 },
        colors: {
          sendButtonColor: 'rgb(94, 81, 248)',
          backgroundColor: 'rgb(249,249,250)',
          composerBackground: 'white',
        },
      }}
      mentionableUsers={[]}
    >
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <a href="https://nextjs.org">Next.js!</a>
          </h1>

          <p className={styles.description}>
            Get started by editing <code className={styles.code}>pages/index.tsx</code>
          </p>

          <div className={styles.grid}>
            <a href="https://nextjs.org/docs" className={styles.card}>
              <h2>Documentation &rarr;</h2>
              <p>Find in-depth information about Next.js features and API.</p>
            </a>

            <a href="https://nextjs.org/learn" className={styles.card}>
              <h2>Learn &rarr;</h2>
              <p>Learn about Next.js in an interactive course with quizzes!</p>
            </a>

            <a
              href="https://github.com/vercel/next.js/tree/canary/examples"
              className={styles.card}
            >
              <h2>Examples &rarr;</h2>
              <p>Discover and deploy boilerplate example Next.js projects.</p>
            </a>

            <a
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              className={styles.card}
            >
              <h2>Deploy &rarr;</h2>
              <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
            </a>
          </div>
        </main>

        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <span className={styles.logo}>
              <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
            </span>
          </a>
        </footer>

        <div
          style={{
            position: 'fixed',
            right: 0,
            top: 0,
            width: 284,
            margin: '0 0 0 0',
            bottom: 0,
            paddingBottom: 4,
            background: 'rgb(249,249,250)',
          }}
        >
          <CollabKit.Thread
            showHeader={true}
            composerPrompt="Add comment..."
            style={{ borderRadius: 0 }}
            threadId="demo"
          />
        </div>
      </div>
    </CollabKit.Provider>
  );
};
