import { useEffect, useState } from 'react';
import remoteConfig from '@react-native-firebase/remote-config';
import { Book, Root } from '../types';

const useRemoteConfig = () => {
  const [jsonData, setJsonData] = useState<Root | undefined>(undefined);
  const [detailsCarousel, setDetailsCarousel] = useState<
    | {
        books: Book[];
      }
    | undefined
  >(undefined);

  useEffect(() => {
    const initializeRemoteConfig = async () => {
      await remoteConfig().setDefaults({
        json_data:
          '{books: [], top_banner_slides: [], you_will_like_section: []}',
        details_carousel: '[]',
      });

      const fetchedRemotely = await remoteConfig().fetchAndActivate();
      if (fetchedRemotely) {
        console.log('Configs were retrieved from the backend and activated.');
      } else {
        console.log(
          'No configs were fetched from the backend, and the local configs were already activated'
        );
      }

      const jsonData = remoteConfig().getValue('json_data').asString();
      const details_carousel = remoteConfig()
        .getValue('details_carousel')
        .asString();
      setJsonData(JSON.parse(jsonData) as Root);
      setDetailsCarousel(
        JSON.parse(details_carousel) as {
          books: Book[];
        }
      );
    };

    initializeRemoteConfig();
  }, []);

  return { detailsCarousel, jsonData };
};

export default useRemoteConfig;
