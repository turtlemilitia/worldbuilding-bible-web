import React, { FunctionComponent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Post from '../../../components/Post'
import { useLanguageForm } from '../../../hooks/Forms'
import useUrlFormatter from '../../../hooks/useUrlFormatter'
import { fixId } from '@/utils/dataUtils'

const Language: FunctionComponent = () => {

  const navigate = useNavigate()

  const { compendiumId, languageId } = useParams() as { compendiumId:string; languageId: string } // router
  const { compendiumPath } = useUrlFormatter()

  const form = useLanguageForm({
    compendiumId: fixId(compendiumId),
    languageId: fixId(languageId),
    onCreated: (data) => {
      navigate(`${compendiumPath}/languages/${data.id}/${data.slug}`)
    },
    onDeleted: () => {
      navigate(`${compendiumPath}/languages`)
    },
  })

  return (
    <Post
      pageTypeName={'Language'}
      form={form}
    />
  )
}

export default Language
