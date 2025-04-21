import { formatLocalTime, resError } from "@/helpers/function.helper";
import { useCreateReactionArticle } from "@/tantask/reaction.tanstack";
import { TArticle } from "@/types/article.type";
import { EReactionArticle } from "@/types/enum/reaction.enum";
import { ActionIcon, Box, Button, Group, Stack, Text } from "@mantine/core";
import { IconDots, IconMessageCircle, IconShare3, IconX } from "@tabler/icons-react";
// import Image from "next/image";
import { NEXT_PUBLIC_BASE_DOMAIN_CLOUDINARY } from "@/constant/app.constant";
import { Image as ImageMantine } from "@mantine/core";
import { useState } from "react";
import { toast } from "react-toastify";
import Avatar from "../avatar/Avatar";
import TextContent from "../text-content/TextContent";
import classes from "./Article.module.css";
import IconReaction from "./icon-reaction/IconReaction";

type TProps = {
   article: TArticle;
};

export default function Article({ article }: TProps) {
   const initReactionType = article.Reactions_Articles?.[0]?.reactionType ? article.Reactions_Articles[0]?.reactionType : EReactionArticle[`None`];
   const [reactionType, setReactionType] = useState(initReactionType);
   const createReactionArticle = useCreateReactionArticle();

   const handleLike = (article: TArticle) => {
      console.log({ article });
      createReactionArticle.mutate(
         {
            articleId: article.id,
            reactionType: EReactionArticle[`Like`],
         },

         {
            onSuccess: (data) => {
               setReactionType(data.reactionType);
            },
            onError: (error) => {
               console.log(error);
               toast.error(resError(error, `Create Reaction Failed`));
            },
         }
      );
   };

   return (
      <Box className={`${classes[`box-container`]}`}>
         {/* info */}
         <Group justify="space-between" wrap="nowrap" px={10} py={15}>
            <Box style={{ flexShrink: 0 }}>
               <Avatar user={article.Users} />
            </Box>
            <Stack gap={0} flex={1}>
               <Text fw={`bold`}>{article.Users?.fullName}</Text>
               <Text c={`dimmed`}>{formatLocalTime(article.createdAt, `ago`)}</Text>
            </Stack>

            {/* control */}
            <Group style={{ flexShrink: 0 }}>
               <ActionIcon variant="subtle" radius="xl">
                  <IconDots style={{ width: "70%", height: "70%" }} stroke={1.5} />
               </ActionIcon>
               <ActionIcon variant="subtle" radius="xl">
                  <IconX style={{ width: "70%", height: "70%" }} stroke={1.5} />
               </ActionIcon>
            </Group>
         </Group>

         {/* content */}
         <Box px={10} py={5}>
            <TextContent text={article.content} />
         </Box>

         {/* image */}
         {article.imageUrl && (
            <Box>
               {/* <Image
                  alt=""
                  src={`https://be-node.vulebaolong.com/images/local-imageArticle-1740872693438-967081367.webp`}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "100%", objectFit: "cover", maxHeight: `700px` }}
               /> */}
               <ImageMantine src={`${NEXT_PUBLIC_BASE_DOMAIN_CLOUDINARY}${article.imageUrl}`} />
            </Box>
         )}

         {/* sub-info */}
         <Group px={10} py={5}>
            <Text c={`dimmed`}>{500} Bình Luận</Text>
         </Group>

         {/* control */}
         <Group px={10} py={10} justify="space-around">
            <Button
               onClick={() => {
                  handleLike(article);
               }}
               flex={1}
               leftSection={<IconReaction reactionType={reactionType} />}
               variant="subtle"
            >
               Thích
            </Button>
            <Button flex={1} leftSection={<IconMessageCircle size={14} />} variant="subtle">
               Bình Luận
            </Button>
            <Button flex={1} leftSection={<IconShare3 size={14} />} variant="subtle">
               Chia Sẻ
            </Button>
         </Group>
      </Box>
   );
}
