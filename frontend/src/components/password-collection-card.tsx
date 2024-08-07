// import DeletePasswordAlertDialog from './delete-password-alert-dialog'
import PasswordContent from './password-content'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'
import { Card, CardContent } from './ui/card'
// import EditPasswordDialog from './edit-password-dialog'
import type { Password } from '@/types'

interface PasswordCollectionCardProps {
  password: Password
}

const PasswordCollectionCard: React.FC<PasswordCollectionCardProps> = ({ password }) => {
  return (
    <Card>
      <CardContent className="p-0 px-5">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger className="m-0">
              <div className="inline-flex text-sm capitalize">
                {password.website_name}
              </div>
            </AccordionTrigger>

            <AccordionContent className="space-y-2">
              <PasswordContent
                password={password}
              />
              <div className="flex items-center space-x-3 px-2">
                {/* <DeletePasswordAlertDialog passwordId={password.id} />
                <EditPasswordDialog
                  password={password}
                /> */}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}

export default PasswordCollectionCard
