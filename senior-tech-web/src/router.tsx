import { createBrowserRouter } from 'react-router-dom'
import { DefaultLayout } from './app/layouts/default'
import { HomePage } from './app/pages/home'
import { VideoPage } from './app/pages/video'
import { QuizPage } from './app/pages/quiz'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'video',
                element: <VideoPage />
            },
            {
                path: 'quiz',
                element: <QuizPage />
            }
        ]
    }
])