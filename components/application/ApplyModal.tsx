import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0/client';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';
import { createApplication } from '../../services/airtable';
import { v4 as uuidv4 } from 'uuid';

interface ApplyModalProps {
    isOpen: boolean;
    onClose: () => void;
    shift_uuid: string;
    shift_id: string;
  }

const ApplyModal: React.FC<ApplyModalProps> = ({ isOpen, onClose, shift_uuid, shift_id }) => {
  const router = useRouter();

  const { user } = useUser();

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };


  const handleApply = async () => {
    if (!user || !user.sub || !shift_uuid) {
      return;
    }

    const application = {
      shift_uuid: [shift_id],
      applicant_user_id: user.sub,
      application_uuid: uuidv4(),
      application_date: formatDate(new Date()),
      status: 'submitted',
    };

    console.log(application)

    await createApplication(application);
    onClose();
  };

  return (
    <>
      

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Apply for Shift</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Are you sure you want to apply for this shift?</p>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleApply}>
              Apply
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ApplyModal;