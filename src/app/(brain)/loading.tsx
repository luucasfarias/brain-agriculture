import { Skeleton } from "@/components/skeleton";
import { Box, Card, Flex, Grid } from "@radix-ui/themes";

export default function HomeLoading() {
  return (
    <div>
      <Grid columns="3" gap="3" width="auto" className="">
        <Box height="9">
          <Card >
            <Flex gap="3" align="center" justify="between">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-6 w-10" />
            </Flex>
            <Flex gap="3" align="center" justify="center" pt="2">
              <Skeleton className="h-6 w-20" />
            </Flex>
          </Card>
        </Box>
        <Box height="9">
          <Card >
            <Flex gap="3" align="center" justify="between">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-6 w-10" />
            </Flex>
            <Flex gap="3" align="center" justify="center" pt="2">
              <Skeleton className="h-6 w-20" />
            </Flex>
          </Card>
        </Box>

        <Box height="9">
          <Card >
            <Flex gap="3" align="center" justify="between">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-6 w-10" />
            </Flex>
            <Flex gap="3" align="center" justify="center" pt="2">
              <Skeleton className="h-6 w-20" />
            </Flex>
          </Card>
        </Box>

        <Box height="9" pt="8">
          <Skeleton className="h-80" />
        </Box>

        <Box height="9" pt="8">
          <Skeleton className="h-80" />
        </Box>

        <Box height="9" pt="8">
          <Skeleton className="h-80" />
        </Box>
      </Grid>
    </div>
  )
}