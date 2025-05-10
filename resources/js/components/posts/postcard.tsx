import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Post } from '@/types';




export default function MyPost(posts : Post[]) {
    return (
        <>
        {posts.length > 0 ? (
            <p>trueee</p>
            ) : (
                <p>falsee   </p>
            )}
            {/* {posts.map((post) => {
                <div key={post.id}>
                <Card className="w-[350px]" >
                    <CardHeader>
                        <CardTitle>{post.name}</CardTitle>
                        <CardDescription>Recipe title : {post.recipename}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <ul>
                                <li>{post.ingredients}</li>
                                <li>{post.description}</li>
                            </ul>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" placeholder="Name of your project" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="framework">Framework</Label>
                                <Select>
                                    <SelectTrigger id="framework">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="next">Next.js</SelectItem>
                                        <SelectItem value="sveltekit">SvelteKit</SelectItem>
                                        <SelectItem value="astro">Astro</SelectItem>
                                        <SelectItem value="nuxt">Nuxt.js</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline">Like</Button>
                        <Button>Comment</Button>
                    </CardFooter>
                </Card>
                </div>; */}
            {/* })} */}
        </>
    );
}
