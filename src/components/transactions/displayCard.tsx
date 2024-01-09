import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface DisplayCardProps {
    title: string;
    description : String;
    content: string;
  }

const DisplayCard: React.FC<DisplayCardProps> = ({title,description,content}) => {

    return (
        <>
            <Card className="w-[30%]">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent>
                    {content}
                </CardContent>
            </Card>
        </>
    )
}

export default DisplayCard;